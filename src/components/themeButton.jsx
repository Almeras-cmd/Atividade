function ThemeButton({ dark, onToggle }){ 

    return(
        <button
            className="theme-button"
            onClick={onToggle}
        >
            {dark ? 'Tema Claro' : 'Tema escuro'}
        </button>
    )
}
export default ThemeButton 