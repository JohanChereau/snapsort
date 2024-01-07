import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ToolBox.scss';
import { TbAnalyzeFilled } from 'react-icons/tb';
import { FaSortAmountDown } from 'react-icons/fa';
import Tool from './tool/Tool';

const ToolBox = () => {
  const ICONS_COLOR = 'var(--clr-accent-400)';
  const ICONS_SIZE = 4;

  const toolboxRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (toolboxRef.current) {
      gsap.fromTo(
        toolboxRef.current,
        { y: 200, opacity: 0 },
        { duration: 1, y: 0, opacity: 1, delay: .3 }
      );
    }
  }, []);

  return (
    <ul className="toolbox__list container" ref={toolboxRef}>
      <Tool
        icon={FaSortAmountDown}
        iconColor={ICONS_COLOR}
        iconSize={`${ICONS_SIZE - 0.8}em`}
        name="Sort files"
        linkTo="/sorting-tool"
      />
      <Tool
        icon={TbAnalyzeFilled}
        iconColor={ICONS_COLOR}
        iconSize={`${ICONS_SIZE}em`}
        name="Analyze folders"
        linkTo="/analyze-tool"
      />
    </ul>
  );
};

export default ToolBox;
