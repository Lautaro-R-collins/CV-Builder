# CV Builder - Generador de Currículum Profesional

Una aplicación web para crear currículums profesionales de forma sencilla siguiendo el formato recomendado por Harvard y amigable con los ATS. Permite la edición en tiempo real de la información personal, experiencia laboral, educación y habilidades, con la posibilidad de descargar el resultado final en formato PDF.

##  Tecnologías Utilizadas

- **React 19** & **Vite**: Para una experiencia de desarrollo rápida y una interfaz reactiva.
- **Tailwind CSS**: Para un diseño moderno, limpio y responsive.
- **Context API & useReducer**: Gestión robusta del estado global de la aplicación.
- **Lucide React**: Biblioteca de iconos elegantes y minimalistas.
- **react-to-print**: Para la generación y descarga precisa de archivos PDF.
- **UUID**: Generación de identificadores únicos para los elementos de las listas.
- **I18n**: Cambio de idioma de Ingles a Espanol con i18n

## 📂 Estructura del Proyecto

```text
src/
├── components/        # Componentes reutilizables de la interfaz
│   ├── CV/            # Componentes principales del Generador
│   │   ├── CV.jsx     # Previsualización del Currículum
│   │   └── SideBar.jsx # Editor lateral interactivo
│   └── Footer/        # Pie de página de la aplicación
├── context/           # Gestión del estado global
│   ├── CVContext.jsx  # Definición del Contexto y Provider
│   └── cvReducer.js   # Lógica de las acciones (Update, Add, Delete)
├── styles/            # Estilos globales y configuraciones de Tailwind
└── App.jsx            # Punto de entrada principal y layout
```

##  Gestión del Estado (Context & Reducer)

El proyecto utiliza un patrón de **Context API** combinado con **useReducer** para manejar la compleja estructura de datos del CV de forma centralizada.

- **Initial State**: Define una estructura predeterminada (datos de ejemplo) para que el usuario visualice el diseño de inmediato.
- **Actions**:
  - `UPDATE_GENERAL_INFO`: Actualiza los campos de contacto.
  - `ADD_ITEM`: Añade un nuevo bloque a Educación, Experiencia o Habilidades.
  - `UPDATE_ITEM`: Modifica un bloque existente mediante su ID único.
  - `DELETE_ITEM`: Elimina un bloque específico.

## 🛠️ Instalación y Uso

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
4. **Construir para producción**:
   ```bash
   npm run build
   ```

## 📄 Licencia
Desarrollado por Lautaro-R-collins 
