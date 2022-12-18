export function getFeedHtml(tweets) {
    let feedHtml = ``;
  
    tweets.forEach((tweet) => {
      let likeIconClass = "";
      if (tweet.isLiked) {
        likeIconClass = "liked";
      }
  
      let retweetIconClass = "";
      if (tweet.isRetweeted) {
        retweetIconClass = "retweeted";
      }
      let repliesHtml = ``;
      if (tweet.replies.length > 0) {
        tweet.replies.forEach(function (reply) {
          repliesHtml += `
              
              <div class="tweet-reply">
              <div class="tweet-inner">
                  <img src="${reply.profilePic}" class="profile-pic">
                      <div>
                          <p class="handle">${reply.handle}</p>
                          <p class="tweet-text">${reply.tweetText}</p>
                      </div>
                  </div>
          </div>`;
        });
      }
      let newReply = `<div class="tweet-input-area">
      <textarea 
      name="reply-input"
      class="reply-input" 
      id="reply-input" c
      ols="40" 
      rows="10" 
      placeholder="Reply tweet..."></textarea>
      <img src="images/scrimbalogo.png" class="profile-pic" alt="profile picture">
  </div>
  <button class="reply-button"id="reply-btn" data-reply-tweet="${tweet.uuid}">Reply</button>
  `;
  
      feedHtml += `
          <div class="tweet">
              <div class="tweet-inner">
                  <img src="${tweet.profilePic}" class="profile-pic">
                  <div>
                      <p class="handle">${tweet.handle}</p>
                      <p class="tweet-text">${tweet.tweetText}</p>
                      <div class="tweet-details">
                          <span class="tweet-detail">
                          <i class="fa-regular fa-comment-dots" 
                          data-reply="${tweet.uuid}"
                          ></i>
                          ${tweet.replies.length}
                          </span>
                          <span class="tweet-detail">
                          <i class="fa-solid ${likeIconClass} fa-heart" 
                          data-like="${tweet.uuid}"
                          ></i>
                          ${tweet.likes}
                          </span>
                          <span class="tweet-detail">
                          <i class="fa-solid ${retweetIconClass} fa-retweet"
                          data-retweet="${tweet.uuid}"
                          ></i>
                          ${tweet.retweets}
                          </span>
                      </div>   
                  </div>            
              </div>
              <div class="hidden"id="replies-${tweet.uuid}">
              ${newReply}
          ${repliesHtml}
      </div>   
          </div>`;
    });
    return feedHtml;
  }
  