import { useState, FC } from 'react';
import ArrowIcon from './ArrowIcon';
import './NavigationMenu.css'
import styles from './NavigationMenu.module.css';

const NavigationMenu: FC = () => {
  const [itemOpenState, setItemOpenState] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (item: string) => {
    setItemOpenState(prevState => ({
      ...prevState,
      [item]: !prevState[item], // Toggle the specific item
    }));
  };

  return (
    <ul className={styles.navList} >
      <li onClick={() => handleToggle('Apple')}>
        Apple <ArrowIcon isOpen={itemOpenState['Apple']} />
      </li>
      <li onClick={() => handleToggle('INOI')}>
        INOI <ArrowIcon isOpen={itemOpenState['INOI']} />
      </li>
      <li onClick={() => handleToggle('Nokia')}>
        Nokia <ArrowIcon isOpen={itemOpenState['Nokia']} />
      </li>
      <li onClick={() => handleToggle('Oppo')}>
        Oppo <ArrowIcon isOpen={itemOpenState['Oppo']} />
      </li>
      <li onClick={() => handleToggle('Xiaomi')}>
        Xiaomi <ArrowIcon isOpen={itemOpenState['Xiaomi']} />
      </li>
      <li onClick={() => handleToggle('Realme')}>
        Realme <ArrowIcon isOpen={itemOpenState['Realme']} />
      </li>
      <li onClick={() => handleToggle('Samsung')}>
        Samsung <ArrowIcon isOpen={itemOpenState['Samsung']} />
      </li>
      <li onClick={() => handleToggle('Sony')}>
        Sony <ArrowIcon isOpen={itemOpenState['Sony']} />
      </li>
      <li onClick={() => handleToggle('Vivo')}>
        Vivo <ArrowIcon isOpen={itemOpenState['Vivo']} />
      </li>
      {/* More items */}
    </ul>
  );
};

export default NavigationMenu;
