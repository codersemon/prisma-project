// dependencies
import { RiDeleteBinLine, RiDownload2Line, RiEyeLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteSingleMediaFile } from "../../feature/mediaApiSlice";

const MediaAction = ({ id, url }) => {
  /**
   * react-redux "useDispatch" hook init
   */
  const dispatch = useDispatch();

  /**
   * Hnandle media delete
   */
  const handleMediaDelete = (e, id) => {
    e.preventDefault();

    // delete from db reducer action
    dispatch(deleteSingleMediaFile(id));
  };
  return (
    <div className="dropdown media-action-dropdown">
      <ul className="media-action">
        <li>
          <a className="" href={url} target="_blank">
            <RiEyeLine />
          </a>
        </li>
        <li>
          <a className="" href="#">
            <RiDownload2Line />
          </a>
        </li>
        <li>
          <span onClick={(e) => handleMediaDelete(e, id)}>
            <RiDeleteBinLine fill="#ef3f3e" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MediaAction;
