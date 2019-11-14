import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';

export class ExpenseListFilters extends React.Component {

    state = {
        focusedInput: null,
    };
    
    onFocusChange = (focusedInput) => {
        this.setState(() => ({ 
            focusedInput: focusedInput
        }));
    };
    
    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) => {
        if(e.target.value == 'date') {
            this.props.sortByDate();
        } else if (e.target.value == 'amount') {
            this.props.sortByAmount();
        }
    };

    render() {
        return(
            <div>
                <input onChange={this.onTextChange} type="text" value={this.props.filters.text}/>
                <select 
                    value={this.props.filters.sortBy}
                    onChange={this.onSortChange}
                > 
                    <option value="amount">Amount</option>
                    <option value="date">Date</option>
                </select>
                
                <DateRangePicker
                    startDate={this.props.filters.startDate}
                    startDateId={"startDate"}
                    endDate={this.props.filters.endDate}
                    endDateId={"endDate"}
                    onDatesChange={this.onDatesChange}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                    showClearDates={true}
                />
            </div>
        );
    }
};

// Use the react-redux connect method to map state to props
// so we don't need to pass them down through all the components
const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch, props) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
});


export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);