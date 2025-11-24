# Pharmacy Management System

A comprehensive pharmacy management system built with React, TypeScript, and Tailwind CSS. This system provides role-based access control and is designed to integrate with Django REST API backend.

## Features

### Role-Based Access Control
- **Super User**: Complete system access and management
- **Clinic Admin**: Clinic operations and staff management
- **Doctor**: Patient care and medical records
- **Nurse**: Patient care and medication management
- **Pharmacy**: Complete e-commerce and pharmacy management

### Pharmacy Management Features
- **Product Management**: Add, edit, and manage pharmacy products with detailed information
- **Order Management**: Process customer orders, track fulfillment, and manage order status
- **Inventory Management**: Track stock levels, manage suppliers, and handle stock movements
- **Category Management**: Organize products with hierarchical categories
- **Customer Management**: Manage customer relationships and purchase history
- **Analytics Dashboard**: Comprehensive business insights and performance metrics

### Technical Features
- Responsive design with dark mode support
- Modern UI with Tailwind CSS
- Chart.js integration for analytics
- TypeScript for type safety
- Role-based routing and permissions
- Modular component architecture

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pharmacy-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

Use these credentials to test different roles:

- **Super User**: `superuser@clinic.com` / `super123`
- **Clinic Admin**: `clinicadmin@clinic.com` / `clinic123`
- **Doctor**: `doctor@clinic.com` / `doctor123`
- **Nurse**: `nurse@clinic.com` / `nurse123`
- **Pharmacy**: `pharmacy@clinic.com` / `pharmacy123`

## Django REST API Integration

This frontend is designed to work with a Django REST API backend. Here's the expected API structure:

### Authentication Endpoints
```
POST /api/auth/login/
POST /api/auth/logout/
POST /api/auth/refresh/
GET /api/auth/user/
```

### Pharmacy API Endpoints

#### Products
```
GET /api/pharmacy/products/
POST /api/pharmacy/products/
GET /api/pharmacy/products/{id}/
PUT /api/pharmacy/products/{id}/
DELETE /api/pharmacy/products/{id}/
```

#### Orders
```
GET /api/pharmacy/orders/
POST /api/pharmacy/orders/
GET /api/pharmacy/orders/{id}/
PUT /api/pharmacy/orders/{id}/
DELETE /api/pharmacy/orders/{id}/
```

#### Inventory
```
GET /api/pharmacy/inventory/
POST /api/pharmacy/inventory/stock-adjustment/
GET /api/pharmacy/inventory/{id}/
PUT /api/pharmacy/inventory/{id}/
```

#### Categories
```
GET /api/pharmacy/categories/
POST /api/pharmacy/categories/
GET /api/pharmacy/categories/{id}/
PUT /api/pharmacy/categories/{id}/
DELETE /api/pharmacy/categories/{id}/
```

#### Customers
```
GET /api/pharmacy/customers/
POST /api/pharmacy/customers/
GET /api/pharmacy/customers/{id}/
PUT /api/pharmacy/customers/{id}/
DELETE /api/pharmacy/customers/{id}/
GET /api/pharmacy/customers/{id}/orders/
```

#### Analytics
```
GET /api/pharmacy/analytics/dashboard/
GET /api/pharmacy/analytics/revenue/
GET /api/pharmacy/analytics/products/
GET /api/pharmacy/analytics/customers/
```

### Expected Data Models

#### Product Model
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  sku: string;
  price: number;
  comparePrice?: number;
  cost: number;
  stock: number;
  minStock: number;
  maxStock: number;
  weight?: number;
  dimensions?: string;
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  soldCount: number;
  rating: number;
  reviewCount: number;
}
```

#### Order Model
```typescript
interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  paymentMethod: string;
  notes?: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}
```

#### Customer Model
```typescript
interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  address: Address;
  registrationDate: string;
  lastOrderDate?: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  status: 'Active' | 'Inactive' | 'Blocked';
  loyaltyPoints: number;
  preferredPaymentMethod?: string;
  notes?: string;
  tags: string[];
}
```

## API Integration Setup

1. Create an API service layer in `src/services/`:
```typescript
// src/services/api.ts
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const apiClient = {
  get: (endpoint: string) => fetch(`${API_BASE_URL}${endpoint}`),
  post: (endpoint: string, data: any) => fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  // ... other methods
};
```

2. Create service files for each module:
```typescript
// src/services/pharmacyService.ts
export const pharmacyService = {
  getProducts: () => apiClient.get('/pharmacy/products/'),
  createProduct: (data: Product) => apiClient.post('/pharmacy/products/', data),
  // ... other methods
};
```

3. Update components to use real API calls instead of mock data.

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Pharmacy Management System
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── Dashboard/       # Role-specific dashboards
│   ├── Layout/          # Layout components
│   └── Settings/        # Settings components
├── contexts/            # React contexts
├── hooks/              # Custom hooks
├── pages/
│   └── Pharmacy/       # Pharmacy-specific pages
├── services/           # API services (to be implemented)
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Development

### Adding New Features

1. Create components in appropriate directories
2. Add routes in `App.tsx`
3. Update navigation in `Sidebar.tsx`
4. Add proper TypeScript types
5. Implement API integration

### Code Style

- Use TypeScript for all new code
- Follow React best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add loading states for async operations

## Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.