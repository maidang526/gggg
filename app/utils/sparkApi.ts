import CryptoJS from 'crypto-js';

interface SparkConfig {
  appId: string;
  apiKey: string;
  apiSecret: string;
}

const config: SparkConfig = {
  appId: 'd2e475e0',
  apiKey: 'a8a148d10525bebf78d3e4a2ab18961f',
  apiSecret: 'N2YzMzZiNGE1OGZhZjc0OGJjOTc0YzQy'
};

export class SparkAPI {
  private ws: WebSocket | null = null;
  private onMessageCallback: ((message: string) => void) | null = null;
  private messageHistory: { role: string; content: string }[] = [];
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 3;
  private currentResponse: string = '';
  private isFirstChunk: boolean = true;

  constructor() {
    this.checkWebSocketSupport();
  }

  private checkWebSocketSupport(): void {
    if (typeof WebSocket === 'undefined') {
      throw new Error('WebSocket is not supported in this environment');
    }
  }

  private getWebSocketState(): string {
    if (!this.ws) return 'CLOSED';
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'CONNECTING';
      case WebSocket.OPEN:
        return 'OPEN';
      case WebSocket.CLOSING:
        return 'CLOSING';
      case WebSocket.CLOSED:
        return 'CLOSED';
      default:
        return 'UNKNOWN';
    }
  }

  private formatText(text: string): string {
    // 1. 移除开头的空白字符
    text = text.trimStart();
    
    // 2. 将连续的多个换行替换为两个换行
    text = text.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // 3. 确保每个句子后面只有一个换行
    text = text.replace(/([。！？!?])\s*\n+/g, '$1\n');
    
    // 4. 移除句子中间的换行
    text = text.replace(/([^。！？!?])\n+/g, '$1');
    
    // 5. 确保句子之间有适当的间隔
    text = text.replace(/([。！？!?])\s*([^\n])/g, '$1\n$2');
    
    return text.trim();
  }

  private createAuthUrl(): string {
    try {
      const host = 'spark-api.xf-yun.com';
      const path = '/v3.5/chat';
      const date = new Date().toUTCString();
      
      const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${path} HTTP/1.1`;
      console.log('Signature Origin:', signatureOrigin);
      
      const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret);
      const signature = CryptoJS.enc.Base64.stringify(signatureSha);
      console.log('Signature:', signature);
      
      const authorization_origin = `api_key="${config.apiKey}",algorithm="hmac-sha256",headers="host date request-line",signature="${signature}"`;
      
      const authorization = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorization_origin));
      console.log('Authorization:', authorization);
      
      const url = `wss://${host}${path}?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date)}&host=${encodeURIComponent(host)}`;
      console.log('Generated URL:', url);
      return url;
    } catch (error) {
      console.error('Error creating auth URL:', error);
      throw new Error('Failed to create authentication URL');
    }
  }

  public async connect(onMessage: (message: string) => void): Promise<void> {
    try {
      this.checkWebSocketSupport();
      
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        console.log('WebSocket is already connected');
        return;
      }

      const url = this.createAuthUrl();
      console.log('Current WebSocket state:', this.getWebSocketState());
      
      return new Promise((resolve, reject) => {
        try {
          this.ws = new WebSocket(url);
          this.onMessageCallback = onMessage;

          const connectionTimeout = setTimeout(() => {
            if (this.ws?.readyState === WebSocket.CONNECTING) {
              console.log('Connection timeout, closing socket');
              this.ws.close();
              reject(new Error('Connection timeout after 5 seconds'));
            }
          }, 5000);

          this.ws.onopen = () => {
            clearTimeout(connectionTimeout);
            console.log('WebSocket connected successfully');
            console.log('WebSocket state after connection:', this.getWebSocketState());
            this.onMessageCallback?.('连接成功，请输入您的问题');
            this.reconnectAttempts = 0;
            resolve();
          };

          this.ws.onmessage = (event) => {
            try {
              const response = JSON.parse(event.data);
              console.log('Received response:', response);

              if (!response.header || response.header.code !== 0) {
                console.error('API Error:', response.header);
                this.onMessageCallback?.(`抱歉，出现了一些问题：${response.header?.message || '未知错误'}`);
                return;
              }

              if (response.payload?.choices?.text?.[0]?.content) {
                const text = response.payload.choices.text[0].content;
                
                // 处理第一个文本块
                if (this.isFirstChunk) {
                  this.currentResponse = text.trimStart();
                  this.isFirstChunk = false;
                } else {
                  this.currentResponse += text;
                }

                // 如果是最后一个响应，进行格式化
                if (response.header.status === 2) {
                  const formattedText = this.formatText(this.currentResponse);
                  this.messageHistory.push({ role: 'assistant', content: formattedText });
                  this.onMessageCallback?.(formattedText);
                  this.currentResponse = '';
                  this.isFirstChunk = true;
                  console.log('Conversation completed');
                }
              }
            } catch (error) {
              console.error('Failed to parse response:', error, event.data);
              this.onMessageCallback?.('抱歉，处理响应时出现错误');
            }
          };

          this.ws.onerror = (error: Event) => {
            clearTimeout(connectionTimeout);
            
            const errorInfo = {
              message: 'WebSocket connection failed',
              readyState: this.getWebSocketState(),
              timestamp: new Date().toISOString(),
              wsUrl: this.ws?.url || 'unknown',
              errorType: error.type,
              isTrusted: error.isTrusted
            };
            
            console.error('WebSocket error:', errorInfo);
            reject(new Error(JSON.stringify(errorInfo)));
          };

          this.ws.onclose = (event) => {
            clearTimeout(connectionTimeout);
            console.log('WebSocket closed:', {
              code: event.code,
              reason: event.reason,
              wasClean: event.wasClean,
              state: this.getWebSocketState()
            });
            
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
              console.log(`Attempting to reconnect (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
              this.reconnectAttempts++;
              setTimeout(() => this.connect(onMessage), 1000 * this.reconnectAttempts);
            }
          };
        } catch (error) {
          console.error('Error during WebSocket setup:', error);
          reject(error);
        }
      });
    } catch (error) {
      console.error('Connection error:', error);
      this.onMessageCallback?.('建立连接时出现错误');
      throw error;
    }
  }

  public sendMessage(message: string): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected. Current state:', this.getWebSocketState());
      this.onMessageCallback?.('连接未建立，请稍后重试');
      return;
    }

    // 重置状态
    this.currentResponse = '';
    this.isFirstChunk = true;
    this.messageHistory.push({ role: 'user', content: message });

    const data = {
      header: {
        app_id: config.appId,
        uid: "user_" + Math.random().toString(36).slice(2, 10)
      },
      parameter: {
        chat: {
          domain: "generalv3.5",
          temperature: 0.5,
          max_tokens: 4096
        }
      },
      payload: {
        message: {
          text: this.messageHistory
        }
      }
    };

    console.log('Sending message:', data);
    console.log('WebSocket state before sending:', this.getWebSocketState());

    try {
      this.ws.send(JSON.stringify(data));
    } catch (error) {
      console.error('Failed to send message:', error);
      this.onMessageCallback?.('发送消息失败，请重试');
      this.messageHistory.pop();
    }
  }

  public disconnect(): void {
    if (this.ws) {
      console.log('Disconnecting WebSocket. Current state:', this.getWebSocketState());
      try {
        this.ws.close();
      } catch (error) {
        console.error('Error closing WebSocket:', error);
      }
      this.ws = null;
      this.onMessageCallback = null;
      this.messageHistory = [];
      this.reconnectAttempts = 0;
      this.currentResponse = '';
      this.isFirstChunk = true;
    }
  }
} 