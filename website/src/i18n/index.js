import { addLocaleData } from 'react-intl';
import fr from 'react-intl/locale-data/fr';
import frLocaleData from './fr';

// Enable FR
addLocaleData([...fr]);

export default { intl: frLocaleData };
