# 图片下载配置
$images = @(
    @{
        Name = "climate-report.jpg"
        Url = "https://images.unsplash.com/photo-1581075362882-aa16a7d4494b?auto=format&fit=crop&q=80&w=1920"
    },
    @{
        Name = "ocean-pollution.jpg"
        Url = "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=1920"
    },
    @{
        Name = "renewable-energy.jpg"
        Url = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1920"
    }
)

# 创建输出目录
$outputPath = "public/images"
if (-not (Test-Path $outputPath)) {
    New-Item -ItemType Directory -Path $outputPath -Force
}

Write-Host "Starting parallel downloads..."

$jobs = @()

foreach ($image in $images) {
    $jobs += Start-Job -ScriptBlock {
        param($name, $url, $path)
        $outputFile = Join-Path $path $name
        Invoke-WebRequest -Uri $url -OutFile $outputFile
    } -ArgumentList $image.Name, $image.Url, $outputPath
}

Write-Host "Waiting for downloads to complete..."

Wait-Job $jobs | Out-Null
Receive-Job $jobs
Remove-Job $jobs

Write-Host "All downloads completed!" 