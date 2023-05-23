import React, { useCallback, useEffect, useRef, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {

  const [itemData, setItemData] = useState("");
  const [loading, setLoading] = useState(true)
  const id = useParams().id;
  const topRef = useRef(null); // create ref to top of page

  const fetchItemData = useCallback(async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );

    setItemData(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchItemData();
  }, [fetchItemData])

  useEffect(() => {
    topRef.current.scrollIntoView(); // set focus to top of page when component mounts
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div ref={topRef} id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <Link to={``}>
                  <Skeleton
                    width="100%"
                    height="400px"
                    style={{ borderRadius: "10px" }}
                  />
                </Link>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                    <img
                      src={itemData.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt={itemData.title}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {itemData.title}
                        {" #"}
                        {itemData.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {itemData.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {itemData.likes}
                        </div>
                      </div>
                      <p>
                        {itemData.description}
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/explore">
                                <img className="lazy" src={itemData.ownerImage} alt={itemData.ownerName} />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/explore">{itemData.ownerName}s</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/explore">
                                <img className="lazy" src={itemData.creatorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author/">{itemData.creatorName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="Etherium Icon" />
                          <span>{itemData.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
