# FastMart

**FastMart** is a glossary eCommerce project including admin Dashboard.

## Live URL

[FastMart](https://fast-mart.vercel.app/)

[admin-FastMart](https://admin-fastmart.vercel.app/)

 

## Technology Used
- **Frontend:** Next.js, Tailwind CSS, Redux, ant design
- **Frontend admin:** Reactjs, Tailwind CSS, Redux
- **Backend:** Express.js, Mongoose
- **Database:** Mongodb
- **Image Hosting:** Cloudinary

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher) 

### Installation and run in dev mood (Frontend)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/imrannaazir/fast-mart
   ```

2. **Go to frontend dir:**

   ```bash
   cd view
   npm i
   ```

3. **Create `.env` file and paste :**

```bash
VITE_API_URL=http://localhost:5000/api/v1 
VITE_CLOUDINARY_CLOUD_NAME=dm6yrvvxj
VITE_CLOUDINARY_API_KEY=423247538115551
VITE_CLOUDINARY_API_SECRET=Yw7vhdPQme0VnWHo67CAgfMk8eM
VITE_CLOUDINARY_UPLOAD_PRESET=e-commerce
```

4. **Run this command to run in dev mode:**
   ```bash
   npm run dev
   ```

### Run in dev mood (Backend)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/imrannaazir/fast-mart
   ```

2. **Go to frontend dir:**

   ```bash
   cd backend
   npm i
   ```

3. **Create `.env` file and paste :**

```bash
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://imrannaaziremon:f6b7N3p52jsMuMDq@cluster0.zze69mb.mongodb.net/db?retryWrites=true&w=majority
SUPER_ADMIN_EMAIL=imrannaaziremon@gmail.com
SUPER_ADMIN_PASSWORD=P@ssw0rd
SALT_ROUNDS=10
DATA_LIMIT=10
# CLIENT_URL=https://assignment-6-client.vercel.app
CLIENT_URL=http://localhost:5173

# jwt 
JWT_ACCESS_SECRET=641be78b23088b67c3b7c81a2af459232746c148fb934129002cb604975067be5ce1461c042accdf0451daa3b1acd5b54c3f1b5b1eedf11a8fed7791ef551d2a28
JWT_REFRESH_SECRET=7a5ee3a9b66095e0dd1311a432cb3dbd061d233e8ee9a5bab4a54914eb4a583de5c490e17eb04cda568204113c05d598cd6e56ad5705e52386d60ca684a5f81b69
JWT_ACCESS_TOKEN_EXPIRES_IN=365d
JWT_REFRESH_TOKEN_EXPIRES_IN=30d
```

4. **Run this command to run in dev mode:**
   ```bash
   npm run dev
   ```
