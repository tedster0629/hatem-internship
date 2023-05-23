import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";
import AosWrapper from "../UI/AosWrapper";


const HotCollections = () => {

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotCollections();
  }, [!loading])
  
  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    )
    setCollections(data);
    setLoading(false);
  }

  return (
    <AosWrapper>
      <section id="section-collections" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Hot Collections</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-lg-12">
              {loading ? (
                
                  <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={10}
                    responsiveClass
                    nav
                    responsive={{
                      0: {
                        items: 1,
                      },
                      600: {
                        items: 2,
                      },
                      1000: {
                        items: 4,
                      },
                    }}
                  >
                    {new Array(8).fill(0).map((_, index) => (
                      <div className="nft_coll" key={index}>
                        <div className="nft_wrap">
                          <Link to={``}>
                            <Skeleton width="100%" height="200px" />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to={``}>
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="">
                            <Skeleton width="100px" height="20px" />
                          </Link>
                          <br />
                          <Skeleton width="60px" height="20px" />
                        </div>
                      </div>
                    ))}
                  </OwlCarousel>

              ) : (
                <OwlCarousel
                  className="owl-theme"
                  loop
                  margin={10}
                  responsiveClass
                  nav
                  responsive={{
                    0: {
                      items: 1,
                    },
                    600: {
                      items: 2,
                    },
                    1000: {
                      items: 4,
                    },
                  }}
                >
                  {collections.map((collection) => (
                    <div className="nft_coll" key={collection.id}>
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img src={collection.nftImage} className="lazy img-fluid" alt={`${collection.title} NFT Image`} />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img className="lazy pp-coll" src={collection.authorImage} alt={`${collection.title}'s Author Image`} />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )}
            </div>
          </div>
        </div>
      </section>
    </AosWrapper>
  );
};

export default HotCollections;
