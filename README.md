# CV Builder - Generador de Currículum Profesional

Una aplicación web para crear currículums profesionales de forma sencilla siguiendo el formato recomendado por Harvard y amigable con los ATS. Permite la edición en tiempo real de la información personal, experiencia laboral, educación y habilidades, con la posibilidad de descargar el resultado final en formato PDF.

<img width="1366" height="642" alt="CvBuilder" src="https://github.com/user-attachments/assets/63de43d2-e8c9-4a34-8685-7c789471574f" />


## Características Principales

- **Edición en Tiempo Real**: Visualiza los cambios en tu CV instantáneamente mientras escribes.
- **Reordenar Secciones (Drag & Drop)**: Personaliza el orden de Educación, Experiencia, etc., simplemente arrastrando los bloques.
- **Formato Harvard/ATS**: Diseño optimizado para pasar los filtros automáticos y destacar ante reclutadores.
- **Responsive Design**: App totalmente usable en móviles con un modo de "Tabs" inteligente para editar y previsualizar.
- **Notificaciones Dinámicas**: Feedback visual inmediato al descargar el PDF o cambiar de idioma.
- **Multilingüe**: Soporte completo para Inglés y Español.

## Tecnologías Utilizadas

- **React 19 & Vite**: Interfaz reactiva y construcción ultrarrápida.
- **@hello-pangea/dnd**: Sistema profesional de arrastrar y soltar para reordenar secciones.
- **Tailwind CSS**: Estilizado moderno y responsive basado en utilidades.
- **React Hot Toast**: Notificaciones elegantes y ligeras.
- **react-to-print**: Generación precisa de archivos PDF multi-página.
- **Context API & useReducer**: Gestión robusta del estado global.
- **i18next**: Localización completa de la interfaz.

## Estructura del Proyecto

```text
src/
├── components/        # Componentes reutilizables de la interfaz
│   ├── CV/            # Componentes principales del Generador
│   │   ├── CV.jsx     # Previsualización y lógica de paginación
│   │   ├── SideBar.jsx # Editor lateral interactivo
│   │   └── SettingsModal.jsx # Panel de personalización y reordenamiento
│   └── Footer/        # Pie de página de la aplicación
├── context/           # Gestión del estado global
│   ├── CVContext.jsx  # Context Provider y persistencia en LocalStorage
│   └── cvReducer.js   # Lógica de acciones (Update, Add, Delete, Reorder)
├── locales/           # Archivos de traducción (JSON)
└── App.jsx            # Layout principal y router de vistas (Mobile/Desktop)
```

## Gestión del Estado

El proyecto utiliza un patrón centralizado para manejar la compleja estructura del CV:

- **LocalStorage**: Los datos se guardan automáticamente para que no los pierdas al recargar.
- **Actions**:
  - `UPDATE_GENERAL_INFO`: Datos de contacto.
  - `ADD_ITEM` / `UPDATE_ITEM` / `DELETE_ITEM`: Gestión de bloques de datos.
  - `UPDATE_SETTINGS`: Cambia márgenes, colores, tamaño de fuente y el **orden de las secciones**.

## Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   ```
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

## Licencia
Desarrollado por Lautaro-R-collins 
