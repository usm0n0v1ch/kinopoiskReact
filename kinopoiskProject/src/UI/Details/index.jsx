
import styles from './style.module.css'


export default function Details({onClick}) {
  return (
    <div onClick={onClick} className={styles.container}>
      Подробнее
    </div>
  )
}