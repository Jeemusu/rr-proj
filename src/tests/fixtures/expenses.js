import moment from 'moment';

export default [{
    id: 1,
    description: 'One',
    note: '',
    amount: 100,
    createdAt: moment(0).add(1, 'days').valueOf()
}, {
    id: 2,
    description: 'Two',
    note: '',
    amount: 200,
    createdAt: moment(0).add(10, 'days').valueOf()
}, {
    id: 3,
    description: 'Three',
    note: '',
    amount: 45,
    createdAt: moment(0).add(15, 'days').valueOf()
}];