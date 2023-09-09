import React, { useCallback, useState } from 'react'
import DashboardSideMenu from './DashboardSideMenu'
import DashboardHeader from './DashboardHeader'

const DashboardWrapper = ({
    children
}) => {

    const [toggleMenu, setToggleMenu] = useState(true)

    const handleToggleMenuBar = useCallback(() => {
        setToggleMenu((prev) => !prev)
    }, [])

  return (
    <>
        <DashboardSideMenu open={toggleMenu} onToggleMenu={handleToggleMenuBar} />
        <section id="content">
            <DashboardHeader onToggleMenu={handleToggleMenuBar} />
            <main>
                {children}
            </main>
        </section>
    </>
  )
}

export default DashboardWrapper