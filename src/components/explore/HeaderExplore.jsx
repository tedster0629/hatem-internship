import React from "react";
import AosWrapper from "../UI/AosWrapper";

const HeaderExplore = () => {
  return (
    <AosWrapper>
      <div className="col-lg-12">
        <div className="items_filter">
          <form
            action="blank.php"
            className="row form-dark"
            id="form_quick_search"
            method="post"
            name="form_quick_search"
          >
            <div className="col text-center">
              <input
                className="form-control"
                id="name_1"
                name="name_1"
                placeholder="search item here..."
                type="text"
              />{" "}
              <a href="#" id="btn-submit">
                <i className="fa fa-search bg-color-secondary"></i>
              </a>
              <div className="clearfix"></div>
            </div>
          </form>

          <div id="item_category" className="dropdown">
            <a href="#" className="btn-selector">
              All categories
            </a>
            <ul>
              <li className="active">
                <span>All categories</span>
              </li>
              <li>
                <span>Art</span>
              </li>
              <li>
                <span>Music</span>
              </li>
              <li>
                <span>Domain Names</span>
              </li>
              <li>
                <span>Virtual World</span>
              </li>
              <li>
                <span>Trading Cards</span>
              </li>
              <li>
                <span>Collectibles</span>
              </li>
              <li>
                <span>Sports</span>
              </li>
              <li>
                <span>Utility</span>
              </li>
            </ul>
          </div>
          
          {/* Dropdown for selecting buying options */}
          <div id="buy_category" className="dropdown">
            <a href="#" className="btn-selector">
              Buy Now
            </a>
            <ul>
              <li className="active">
                <span>Buy Now</span>
              </li>
              <li>
                <span>On Auction</span>
              </li>
              <li>
                <span>Has Offers</span>
              </li>
            </ul>
          </div>
          
          {/* Dropdown for selecting item types */}
          <div id="items_type" className="dropdown">
            <a href="#" className="btn-selector">
              All Items
            </a>
            <ul>
              <li className="active">
                <span>All Items</span>
              </li>
              <li>
                <span>Single Items</span>
              </li>
              <li>
                <span>Bundles</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AosWrapper>
  );
};

export default HeaderExplore;
