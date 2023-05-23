import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "../Countdown";
const ExploreItems = () => {
  // Set initial state variables
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(8);

  async function fetchNFTs() {
    // Fetch NFTs from API and set state variables
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
      );
      setNFTs(data);
    }
    
    async function filterNFTs(filter) {
      // Filter NFTs based on selected filter and set state variables
      setLoading(false);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
        );
        
      setNFTs(data);
      setLoading(true);
  }
      
  useEffect(() => {
    // Call fetchNFTs() when component mounts
    fetchNFTs();
  },[])

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterNFTs(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {nfts && loading ? (
        nfts.slice(0, itemCount).map((nft, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${nft.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={nft.authorImage} alt={nft.authorName} />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              {nft.expiryDate && <Countdown expiryDate={nft.expiryDate} />}
              <div className="nft__item_wrap">
                <Link to={`/item-details/${nft.nftId}`}>
                  <img
                    src={nft.nftImage}
                    className="lazy nft__item_preview"
                    alt={nft.title}
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${nft.nftId}`}>
                  <h4>{nft.title}</h4>
                </Link>
                <div className="nft__item_price">
                  {nft.price} ETH<span>{nft.date}</span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{nft.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {new Array(8).fill(0).map((_, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <Skeleton width="100%" height="400px" />
            </div>
          ))}
        </>
      )}
      <div className="col-md-12 text-center">
        {itemCount < 16 && (
          <Link
            onClick={() => setItemCount(itemCount + 4)}
            to=""
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;