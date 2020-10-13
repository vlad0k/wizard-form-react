import moment from 'moment';

const dateYearSubtstract = (years: number): Date => moment().subtract(years, 'years').toDate();

export default dateYearSubtstract;
