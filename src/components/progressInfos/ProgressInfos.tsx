import { SortingProgress } from 'electron/types';
import './ProgressInfos.scss';

const ProgressInfos = ({progressOptions}: {progressOptions: SortingProgress}) => {

  const {path, sortedIndex, total} = progressOptions;
  const progressPercent = (sortedIndex / total) * 100;

  const displaySortingText = (progressPercent: number): string => {
    if(progressPercent === 100) {
      return 'Done';
    } else if(progressPercent === 0) {
      return 'Waiting...'
    }

    return 'Sorting...'
  }

  return (
    <div className='progress-infos container'>
      <div className="progress-infos__header">
        <label htmlFor="progress-bar">{displaySortingText(progressPercent)}</label>
        <span className="progress-value">{progressPercent || 0}%</span>
      </div>

      <progress id="progress-bar" max='100' value={progressPercent || 0}>{progressPercent || 0}%</progress>

      <div className="progress-infos__footer darken-text">
        <p className="progress-pathname">{path || 'path'}</p>
        <p className="progress-length">({sortedIndex || 0}<span className="progress-total-length"> / {total || 0})</span></p>
      </div>
    </div>
  )
}

export default ProgressInfos;