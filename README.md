# 🚀 SmartAuth – Sistema Inteligente de Autenticación con Detección de Anomalías

SmartAuth es un sistema completo de autenticación web con un backend en **FastAPI** y un frontend en **React**, diseñado con enfoque profesional y moderno. Incorpora técnicas de **Machine Learning no supervisado** para detectar accesos sospechosos o inusuales en tiempo real.

---

## 🧠 Objetivo del Proyecto

> Mostrar un alto nivel de dominio en Python, arquitectura de APIs modernas y análisis con IA aplicado a seguridad web, ideal como carta de presentación profesional o proyecto de portafolio técnico.

---

## 📸 Vista previa

> Puedes insertar capturas aquí usando Markdown:

```
![Login y Terminal](https://your-image-link/login-terminal.png)
![Detección de Anomalías](https://your-image-link/anomalies-demo.png)
```

---

## 📂 Tecnologías utilizadas

- ⚙️ Backend: **FastAPI**, **SQLAlchemy**, **Uvicorn**, **SQLite**
- 🔐 Seguridad: Hashing con **Passlib**, Tokens JWT con **python-jose**
- 📊 Machine Learning: **Pandas**, **Scikit-Learn**, `IsolationForest`
- 🎨 Frontend: **React**, **TailwindCSS**, **Framer Motion**, **Prism.js**
- 🐳 Docker: Backend listo para despliegue

---

## ⚙️ Características clave

- [X] Registro/Login con hash y JWT
- [X] API RESTful moderna y documentada (Swagger)
- [X] Logging automático de accesos (IP, user-agent, timestamp)
- [X] Análisis IA de anomalías en accesos con Isolation Forest
- [X] Frontend atractivo y futurista con terminal de respuestas JSON en tiempo real
- [X] Docker del backend listo para producción

---

## 📦 Instalación y ejecución

### 🔧 Requisitos

- Python 3.10+
- Node.js 18+ (para frontend)
- Docker (opcional)

### 💻 Clonar el proyecto

```bash
git clone https://github.com/tuusuario/smartauth.git
cd smartauth
```

### 🚀 Ejecutar solo backend con Docker

```bash
docker compose up --build
```

Visita: [http://localhost:8000/docs](http://localhost:8000/docs)

### 🌐 Ejecutar frontend manualmente (React)

```bash
cd frontend
npm install
npm run dev
```

Visita: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Alternativas de uso

### ▶️ Ejecutar el backend **sin Docker**

Si prefieres no usar Docker, puedes iniciar el backend manualmente con Uvicorn:

```bash
# Crear entorno virtual (opcional)
python -m venv venv
source venv/bin/activate  # en Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Iniciar el servidor
uvicorn app.main:app --reload
```

Accede a la API en: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### ⚡ Frontend simple sin Node.js

En caso de que no quieras usar Node.js o prefieras algo rápido para pruebas, puedes abrir directamente el archivo HTML básico:

```bash
frontend/index.html
```

Este archivo carga un formulario de registro/login simple y consume la API directamente usando `fetch`. Ideal para pruebas rápidas sin compilar nada.

---

## 📊 Análisis IA de accesos

El script `analyze_logs.py` aplica técnicas de detección de anomalías a los logs de acceso:

- Clasifica accesos normales vs. inusuales (`anomaly: 1 / -1`)
- Exporta resultados a `log_analysis.csv`
- Ideal para monitoreo o integraciones de seguridad

```bash
python app/ml/analyze_logs.py
```

---

## 🛠 Estructura del Proyecto

```
smartauth/
├── app/
│   ├── routes/
│   ├── models.py
│   ├── database.py
│   ├── main.py
│   └── ml/analyze_logs.py
├── frontend/
│   └── React App con Tailwind y Framer Motion
├── smartauth.db
├── Dockerfile
├── requirements.txt
├── docker-compose.yml
└── README.md
```

---

## ✨ Créditos y autoría

Este proyecto fue desarrollado por mi como ejercicio avanzado para demostrar capacidades en:

- Backend con Python moderno
- Consumo y diseño de APIs
- Aplicación de machine learning para ciberseguridad
- UI/UX funcional para herramientas técnicas

---

## 📬 Contacto

> Si deseas colaborar, contratar o preguntar algo técnico:
> [📧 Email](mailto:nbaez414@gmail.com)
