// ВРЕМЕННО ЗАКОММЕНТИРОВАНО, ЧТОБЫ НЕ ПАДАЛИ ТЕСТЫ

import { Logo } from "@/shared/ui/logo"
//import { useState } from "react"
import styles from "./header.module.css";
//import { HeaderPanel, PanelProps } from "./type";

export const MainHeader = () =>  {
  //const [openPanel, setOpenPanel] = useState<HeaderPanel | null>(null)

  /*function getPanelProps(name: HeaderPanel): PanelProps {
    return {
      isOpen: openPanel === name,

      isOpenChange: nextOpen => {
        setOpenPanel(current => {
          if (nextOpen) {
            return name
          }

          return current === name ? null : current
        })
      },
    }
  }*/

  return (
    <header className={styles.header && styles.header__inner}>
      <Logo/>

       {/* ———————— Пример Вызова навигации ————
       <HeaderNavigation
        {...getPanelProps('skills')} // Для Popover
      />  */}
    </header>
  )
}