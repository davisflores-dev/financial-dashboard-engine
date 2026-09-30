# 📊 Dashboard Financiero y transacciones

Sistema de procesamiento de eventos financieros y balance consolidado desarrollado con **Clean Architecture** en Node.js/Express y un frontend reactivo en **Next.js (App Router)**. El proyecto destaca por el manejo fuertemente tipado de errores de dominio y DTOs para sanitización de datos.

---

## 🏗️ Arquitectura y Patrones del Sistema

```text
financial-dashboard-engine/
├── backend/                  # API REST Express + TypeScript
│   ├── src/domain/           # Entidades (Account, Transaction), Custom Exceptions e Interfaces
│   ├── src/application/      # Casos de uso (ProcessTransaction, GetDashboardMetrics)
│   ├── src/infrastructure/   # Repositorios InMemory y semillas de datos
│   └── src/presentation/     # Controladores, Zod Schemas y Global Error Handler
└── frontend/                 # Interfaz de usuario Next.js + Tailwind CSS
```

### Principios Aplicados
- **Custom Domain Exceptions:** Control centralizado de reglas de negocio mediante excepciones personalizadas (`InsufficientFundsException`, `BudgetExceededException`, `AccountNotFoundException`).
- **Global Error Handling:** Middleware global en Express para atrapar y transformar excepciones de dominio en respuestas HTTP semánticas (400, 404, 422).
- **Data Transfer Objects (DTOs):** Aislamiento de la capa de presentación mediante DTOs e integración con **Zod** para validación del payload.

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone [https://github.com/davisflores-dev/financial-dashboard-engine.git](https://github.com/davisflores-dev/financial-dashboard-engine.git)
cd financial-dashboard-engine
```

### 2. Iniciar el Backend
```bash
cd backend
npm install
npm run dev
```
> El backend se ejecutará en `http://localhost:4000`.

### 3. Iniciar el Frontend
En otra terminal desde la raíz:
```bash
cd frontend
npm install
npm run dev
```
> Abre `http://localhost:3000` en tu navegador.