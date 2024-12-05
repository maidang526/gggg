'use client';
import Link from 'next/link';

interface IconProps {
  className?: string;
  'aria-hidden'?: boolean;
}

interface NavigationItem {
  name: string;
  href: string;
  icon?: (props: IconProps) => JSX.Element;
}

interface Navigation {
  main: NavigationItem[];
  social: NavigationItem[];
}

export default function Footer() {
  const navigation: Navigation = {
    main: [
      { name: '关于我们', href: '/about' },
      { name: '我们的行动', href: '/campaigns' },
      { name: '新闻资讯', href: '/news' },
      { name: '联系我们', href: '/contact' },
      { name: '隐私政策', href: '/privacy' },
    ],
    social: [
      {
        name: '微博',
        href: '#',
        icon: (props: IconProps) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M20.194 14.32c-.435-.898-1.756-1.482-3.42-1.482-1.664 0-2.985.584-3.42 1.482-.435.898.435 1.482 3.42 1.482 2.985 0 3.855-.584 3.42-1.482zM9.032 13.446c-1.664 0-2.985.584-3.42 1.482-.435.898.435 1.482 3.42 1.482 2.985 0 3.855-.584 3.42-1.482-.435-.898-1.756-1.482-3.42-1.482z" />
          </svg>
        ),
      },
      {
        name: '微信',
        href: '#',
        icon: (props: IconProps) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.516 13.545c-.865 0-1.567-.702-1.567-1.567s.702-1.567 1.567-1.567 1.567.702 1.567 1.567-.702 1.567-1.567 1.567zm6.968 0c-.865 0-1.567-.702-1.567-1.567s.702-1.567 1.567-1.567 1.567.702 1.567 1.567-.702 1.567-1.567 1.567z" />
          </svg>
        ),
      },
    ],
  };

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center space-x-6 md:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base text-gray-400 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="mt-8 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            © 2024 环保组织. 保留所有权利.
          </p>
          <p className="text-sm text-gray-500 text-center mt-2">
            我们致力于通过行动和教育推动环境保护，建设可持续发展的未来。
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/donate"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700"
          >
            支持我们的工作
          </Link>
        </div>
      </div>
    </footer>
  );
} 
