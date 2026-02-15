Backend: Micro-E-commerce Order Engine (WhatsApp Integration)
Este es un backend robusto y escalable diseñado para plataformas de ventas de nicho (bebidas, productos curados) que priorizan la velocidad de conversión mediante una arquitectura de Single-Page Ordering.

🛠️ Stack Tecnológico
Lenguaje/Framework: Node.js con Express, TypeORM, Typescript 

Base de Datos: MySQL

Autenticación: JWT, ByCript

🎯 Características Principales (Lógica de Negocio)
Optimización de Catálogo: API diseñada para servir categorías y productos en un solo llamado (Single-View Ready), minimizando la latencia.

WhatsApp Payload Generator: Motor lógico que procesa el carrito de compras del cliente y genera una estructura de mensaje pre-formateada y codificada para el cierre de venta inmediato.

Gestión de Inventario Simplificada: Endpoints administrativos protegidos para el manejo de stock, precios y estados de productos.

Arquitectura Stateless: Diseñada para ser ligera, delegando el estado del carrito al cliente pero validando la integridad de los precios y disponibilidad en el servidor antes del checkout.

🏗️ Arquitectura de la API
El sistema se basa en una arquitectura de servicios limpia:

GET /products: Recupera el catálogo completo con filtros optimizados.

POST /api/orders/validate: Valida que los productos seleccionados existan y tengan stock antes de permitir el salto a WhatsApp.

POST /intranet/panel-admin: Acceso seguro para la gestión del catálogo.

⚙️ Instalación y Uso
Bash
# Clonar el repositorio
git clone https://github.com/EmAMaz/pedidos-veloz-backend.git

# Instalar dependencias
npm install

# Configurar variables de entorno (.env)
PORT=3000
DATABASE_URL_DEV=tu_url_de_base_de_datos