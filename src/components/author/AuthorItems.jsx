import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import AosWrapper from "../UI/AosWrapper";

const AuthorItems = ({ authorData }) => {
  // create an array of 8 Skeleton components with a loading state
  const loading = new Array(8).fill(0).map((_, index) => (
    <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <Skeleton width="100%" height="400px" />
    </div>
  ));

  return (
    <AosWrapper>
      {/* AOS animation wrapper */}
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {/* if authorData or nftCollection is not available, show the loading state */}
            {!authorData || !authorData.nftCollection
              ? loading
              // else, map through the nftCollection and render each item
              : authorData.nftCollection.map((item, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to="">
                          <img
                            className="lazy"
                            src={authorData.authorImage}
                            alt={`${authorData.authorName}'s image`}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="nft__item_wrap">
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt={item.title}
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </AosWrapper>
  );
};

export default AuthorItems;
