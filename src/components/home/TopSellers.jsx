import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AosWrapper from "../UI/AosWrapper";

const TopSellers = () => {

  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  },[!loading])

  async function fetchAuthors() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setAuthors(data);
    setLoading(false);
  }

  return (
    <AosWrapper>
      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
            <div className="col-md-12">
              {loading ? (
                <ol className="author_list">
                  {new Array(12).fill(0).map((item, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={``}>
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={``}>
                          <Skeleton width="100px" height="20px" />
                        </Link>
                        <span>
                          <Skeleton width="40px" height="20px" />
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <ol className="author_list">
                  {authors.map((author) => (
                    <li key={author.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${author.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt={author.authorName}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${author.authorId}`}>{author.authorName}</Link>
                        <span>{author.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </section>
    </AosWrapper>
  );
};

export default TopSellers;
