import styles from '../../assets/style/ModalCrearClase.module.css'
import IconCreate from '../../assets/imgs/CrearClase.png'

const ModalCrearClase = ({ show, onClose }) => {
    if (!show) return null;
    return(
        <div className={styles.modalFondo}>
            <div className={styles.modalContent}>
                <h1 className={styles.title}>
                    <i className="fas fa-book"></i> Crear Clase
                    <img src={IconCreate} alt="Icon-Home" className={styles.IconCrear} />
                </h1>
                <form action="" className={styles.form}>
                    
                    <input type="text" name="className" placeholder="Nombre de la clase:" />
                    
                    <select name="grado" defaultValue="" >
                        <option value="" disabled hidden>Cuatrimestre:</option> 
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    
                    <select name="grupo" defaultValue="">
                        <option value="" disabled hidden>Grupo:</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                    
                    <div className={styles.modalActions}>
                        <button type="submit" className={styles.createButton}>Crear</button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>

        
    );
};

export default ModalCrearClase;