// dependencies
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import ModalLayout from "../../components/common/ModalLayout";
import MediaAction from "../../components/mediaPage/MediaAction";
import FileUploaderModalContent from "../../components/modalContent/FileUploaderModalContent";
import { getAllMediaFiles } from "../../feature/mediaApiSlice";
import {
  mediaSelect,
  setUploadedFileStateEmpty,
} from "../../feature/mediaSlice";
import "./Media.css";

const MediaPage = () => {
  // media context
  const { mediaFiles, deletingMediaId, isLoading } = useSelector(mediaSelect);

  // const filtered files state
  const [filteredFiles, setFilteredFiles] = useState([]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // item limit per page
  const itemPerPage = 18;

  // handle pagination effect
  useEffect(() => {
    setFilteredFiles(
      mediaFiles.slice(
        (currentPage - 1) * itemPerPage,
        currentPage * itemPerPage
      )
    );
  }, [currentPage, mediaFiles]);

  // pagination array
  const paginationPagesNumber = Array.from(
    { length: Math.ceil(mediaFiles.length / itemPerPage) },
    (_, index) => index + 1
  );

  const isNextPageAvailable =
    currentPage < Math.ceil(mediaFiles.length / itemPerPage);
  const isPrevPageAvailable = currentPage > 1;

  /**
   * react-redux "useDispatch" hook init
   */
  const dispatch = useDispatch();

  /**
   * dispatch All Media Getter Reducer Action
   */
  useEffect(() => {
    dispatch(getAllMediaFiles());
  }, [dispatch]);

  /**
   * ADD Media File MODAL
   */
  const [addMediaModalOpen, setaddMediaModalOpen] = useState(false);

  // invoke if modal is close to set uploadedFileState Empty
  useEffect(() => {
    if (addMediaModalOpen == false) {
      dispatch(setUploadedFileStateEmpty("modal_media"));
    }
  }, [dispatch, addMediaModalOpen]);

  return (
    <>
      <Helmet>
        <title>Media</title>
      </Helmet>

      <div className="page-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="title-header option-title justify-content-start">
                    <h5>Media Library</h5>
                    {/* <div className="selected-options">
                      <ul>
                        <li>selected(0)</li>
                        <li>
                          <a href="#">
                            <RiDownload2Line fill="#0da487" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <RiDeleteBinLine fill="#ef3f3e" />
                          </a>
                        </li>
                      </ul>
                    </div> */}
                    <div className="right-options ms-auto">
                      <ul>
                        <li>
                          <button
                            className="btn btn-animation"
                            onClick={() => setaddMediaModalOpen(true)}
                          >
                            Add Media
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row row-cols-xl-6 row-cols-md-5 row-cols-sm-3 row-cols-2 g-sm-3 g-2 media-library-sec ratio_square">
                    {mediaFiles.length > 0 &&
                      filteredFiles.map((media) => (
                        <div key={media.id}>
                          {media.id === deletingMediaId && isLoading ? (
                            <div className="loader"></div>
                          ) : (
                            <div className="library-box">
                              <input
                                type="checkbox"
                                id={`id-${media.id}`}
                                className="d-none"
                              />
                              <label htmlFor={`id-${media.id}`}>
                                <div className="img-box">
                                  <img src={media?.url} />
                                </div>
                                <MediaAction id={media?.id} url={media?.url} />
                              </label>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  {mediaFiles.length < 1 && (
                    <h4 className="text-center">No file uploaded yet 😶</h4>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12">
              <nav className="custome-pagination">
                <ul className="pagination justify-content-center">
                  {isPrevPageAvailable && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Prev
                      </button>
                    </li>
                  )}

                  {paginationPagesNumber?.length > 0 &&
                    paginationPagesNumber?.map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          currentPage === pageNumber && "active"
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    ))}

                  {isNextPageAvailable && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Profile edit modal  */}
      <ModalLayout
        showModal={addMediaModalOpen}
        closeModal={() => setaddMediaModalOpen(false)}
        title="Upload File"
        className="theme-modal location-modal"
      >
        <FileUploaderModalContent />
      </ModalLayout>
    </>
  );
};

export default MediaPage;
