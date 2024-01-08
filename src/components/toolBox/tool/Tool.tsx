import { PropsWithChildren, createElement } from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import './Tool.scss';

type ToolProps = {
    name: string;
    icon: IconType;
    iconSize: string;
    iconColor: string;
    linkTo: string;
}

const Tool = ({name, icon, iconSize, iconColor, linkTo}: PropsWithChildren<ToolProps>) => {
  return (
    <li className="tool">
      <Link className="tool__link" to={linkTo}>
        <span className="tool__icon">{createElement(icon, {size: iconSize, color: iconColor})}</span>
        <h3 className="tool__name">{name}</h3>
      </Link>
    </li>
  );
};

export default Tool;
