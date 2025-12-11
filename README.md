# Professional CV Layout - Nuxt App

Dự án Nuxt.js được xây dựng theo mô hình Atomic Design, chuyển đổi từ HTML tĩnh sang ứng dụng Vue component-based.

## 🏗️ Cấu trúc Atomic Design

```
components/
├── atoms/           # Các component nhỏ nhất, không thể chia nhỏ hơn
│   ├── AppAvatar.vue
│   ├── AppBadge.vue
│   ├── AppButton.vue
│   ├── AppChip.vue
│   ├── AppIcon.vue
│   ├── AppLogo.vue
│   └── AppProgressBar.vue
│
├── molecules/       # Kết hợp nhiều atoms
│   ├── ContactChip.vue
│   ├── EducationCard.vue
│   ├── ExperienceItem.vue
│   ├── NavLink.vue
│   ├── PortfolioCard.vue
│   ├── SkillBar.vue
│   └── StatCard.vue
│
└── organisms/       # Kết hợp molecules và atoms thành sections
    ├── AboutSection.vue
    ├── AppFooter.vue
    ├── AppNavigation.vue
    ├── EducationSection.vue
    ├── ExperienceSection.vue
    ├── HeroSection.vue
    ├── PortfolioSection.vue
    └── SkillsSection.vue
```

## 🎨 Tính năng

- ✅ Atomic Design Pattern
- ✅ Dark mode support
- ✅ Tailwind CSS với custom theme
- ✅ Responsive design
- ✅ TypeScript support
- ✅ Material Symbols Icons
- ✅ Google Fonts (Spline Sans)

## 📦 Setup

Cài đặt dependencies:

```bash
npm install
```

## 🚀 Development Server

Khởi động server tại `http://localhost:3000`:

```bash
npm run dev
```

## 🏭 Production

Build ứng dụng cho production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📝 Atoms Components

- **AppButton**: Button với nhiều variants (primary, secondary, ghost)
- **AppBadge**: Badge/tag hiển thị trạng thái
- **AppIcon**: Material Symbols icons wrapper
- **AppAvatar**: Avatar với hỗ trợ ảnh hoặc initials
- **AppProgressBar**: Progress bar animated
- **AppChip**: Chip/tag với icon
- **AppLogo**: Logo component với initials

## 🧩 Molecules Components

- **ContactChip**: Chip hiển thị thông tin liên hệ
- **SkillBar**: Thanh progress bar cho kỹ năng
- **StatCard**: Card hiển thị thống kê
- **NavLink**: Navigation link
- **PortfolioCard**: Card project trong portfolio
- **EducationCard**: Card học vấn
- **ExperienceItem**: Item trong timeline kinh nghiệm

## 🏢 Organisms Components

- **AppNavigation**: Header navigation
- **HeroSection**: Hero section với avatar và CTA
- **AboutSection**: Giới thiệu bản thân
- **SkillsSection**: Kỹ năng technical và soft skills
- **ExperienceSection**: Timeline kinh nghiệm làm việc
- **EducationSection**: Học vấn và chứng chỉ
- **PortfolioSection**: Danh sách dự án
- **AppFooter**: Footer với CTA

## 🎨 Tailwind Custom Theme

```js
colors: {
  'primary': '#36e27b',
  'primary-dark': '#2ab863',
  'background-light': '#f6f8f7',
  'background-dark': '#122118',
  'surface-dark': '#1a2c23',
  'surface-light': '#ffffff',
}
```

## 📚 Tài liệu

- [Nuxt Documentation](https://nuxt.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Atomic Design](https://atomicdesign.bradfrost.com/)
