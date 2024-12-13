import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { selectFilter } from '../../redux/filters/selectors';
import { changeFilter } from '../../redux/filters/slice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div className={css.searchBox}>
      <label className={css.labelFilter}>
        Find contacts:
        <input
          className={css.inputFilter}
          type="text"
          value={filter}
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
      </label>
    </div>
  );
};

export default SearchBox;
