import { useState, FC } from 'react';
import ArrowIcon from './ArrowIcon';
import styles from './NavigationMenu.module.css';

interface NavigationMenuProps {
  isMobile:boolean;
}

const NavigationMenu: FC<NavigationMenuProps> = ({isMobile}) => {
  const [itemOpenState, setItemOpenState] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (item: string) => {
    setItemOpenState(prevState => ({
      ...prevState,
      [item]: !prevState[item], // Toggle the specific item
    }));
  };

  return (
    <ul className={styles.navList} style={isMobile ? { position: 'static', borderRadius:"0", background:"#eaeaea", padding:"15px 24px 0px 24px", boxShadow:"0 0 0 0"} : {}} >
      <li onClick={() => handleToggle('Apple')} style={{justifyContent:'start', gap: '5px'}}>
        Apple <ArrowIcon isOpen={itemOpenState['Apple']} />
      </li>
      <li onClick={() => handleToggle('INOI')} style={{justifyContent:'start', gap: '5px'}}>
        INOI <ArrowIcon isOpen={itemOpenState['INOI']} />
      </li>
      <li onClick={() => handleToggle('Nokia')} style={{justifyContent:'start', gap: '5px'}}>
        Nokia <ArrowIcon isOpen={itemOpenState['Nokia']} />
      </li>
      <li onClick={() => handleToggle('Oppo')} style={{justifyContent:'start', gap: '5px'}}>
        Oppo <ArrowIcon isOpen={itemOpenState['Oppo']} />
      </li>
      <li onClick={() => handleToggle('Xiaomi')} style={{justifyContent:'start', gap: '5px'}}>
        Xiaomi <ArrowIcon isOpen={itemOpenState['Xiaomi']} />
      </li>
      <li onClick={() => handleToggle('Realme')} style={{justifyContent:'start', gap: '5px'}}>
        Realme <ArrowIcon isOpen={itemOpenState['Realme']} />
      </li>
      <li onClick={() => handleToggle('Samsung')} style={{justifyContent:'start', gap: '5px'}}>
        Samsung <ArrowIcon isOpen={itemOpenState['Samsung']} />
      </li>
      <li onClick={() => handleToggle('Sony')} style={{justifyContent:'start', gap: '5px'}}>
        Sony <ArrowIcon isOpen={itemOpenState['Sony']} />
      </li>
      <li onClick={() => handleToggle('Vivo')} style={{justifyContent:'start', gap: '5px'}}>
        Vivo <ArrowIcon isOpen={itemOpenState['Vivo']} />
      </li>
      {/* More items */}
    </ul>
  );
};

export default NavigationMenu;
