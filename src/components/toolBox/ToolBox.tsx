import './ToolBox.scss';
import { TbAnalyzeFilled } from "react-icons/tb";
import { FaSortAmountDown } from "react-icons/fa";
import Tool from './tool/Tool';

const ToolBox = () => {

    const ICONS_COLOR = 'var(--clr-accent-400)';
    const ICONS_SIZE = 4;

  return (
    <ul className="toolbox__list container">
        <Tool icon={FaSortAmountDown}  iconColor={ICONS_COLOR} iconSize={`${ICONS_SIZE - 0.8}em`} name='Sort files' linkTo='/sorting-tool'/>
        <Tool icon={TbAnalyzeFilled}  iconColor={ICONS_COLOR} iconSize={`${ICONS_SIZE}em`} name='Analyze folders' linkTo='/'/>
    </ul>
  )
}

export default ToolBox