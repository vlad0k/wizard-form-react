import moment from 'moment';

const ageValidator = (years: number): Date => moment().subtract(years, 'years').toDate();

export default ageValidator;
