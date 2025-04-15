import { getDataByGenre } from '../../state/data/dataSlice';
import { AppDispatch, RootState } from '../../state/store';
import './SelectGenre.scss';
import { useDispatch, useSelector } from 'react-redux';

interface SelectGenreProps {
  type: string;
}

type Genre = {
  id: number;
  name: string;
};

const SelectGenre = ({ type }: SelectGenreProps) => {
  const genres = useSelector((state: RootState) => state.data.genres);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelect = (value: string) => {
    if (value === 'select') return;
    dispatch(getDataByGenre({ genre: value, type }));
  };

  return (
    <div className="select-wrapper">
      <select
        className="flex container-selectgenre"
        defaultValue="select"
        onChange={(e) => handleSelect(e.target.value)}
      >
        <option value="select">Select genre</option>;
        {genres.map((genre: Genre) => {
          return (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectGenre;
