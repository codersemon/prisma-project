const LocationModalContent = () => {
  return (
    <div className="location-list">
      <div className="search-input">
        <input
          type="search"
          className="form-control"
          placeholder="Search Your Area"
        />
        <i className="fa-solid fa-magnifying-glass" />
      </div>
      <div className="disabled-box">
        <h6>Select a Location</h6>
      </div>
      <ul className="location-select custom-height">
        <li>
          <a href="javascript:void(0)">
            <h6>Alabama</h6>
            <span>Min: $130</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <h6>Arizona</h6>
            <span>Min: $150</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <h6>California</h6>
            <span>Min: $110</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <h6>Colorado</h6>
            <span>Min: $140</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <h6>Florida</h6>
            <span>Min: $160</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <h6>Georgia</h6>
            <span>Min: $120</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <h6>Kansas</h6>
            <span>Min: $170</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <h6>Minnesota</h6>
            <span>Min: $120</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <h6>New York</h6>
            <span>Min: $110</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)">
            <h6>Washington</h6>
            <span>Min: $130</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LocationModalContent;
