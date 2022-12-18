import { tweetsData } from "/data.js";
// declaring variables

const test = document.addEventListener("click", (e) => {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  } else if (e.target.dataset.replyTweet) {
    handleReplyToTweet(e.target.dataset.replyTweet);
    console.log(e.target.dataset.replyTweet);
  }
});

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];
  if (!targetTweetObj.isLiked) {
    targetTweetObj.likes++;
  } else {
    targetTweetObj.likes--;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  render();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  if (!targetTweetObj.isRetweeted) {
    targetTweetObj.retweets++;
  } else {
    targetTweetObj.retweets--;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

  render();
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleReplyToTweet(tweetId) {
  const replyInput = document.getElementById("reply-input");
  const targetTweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];

  if (replyInput.value) {
    targetTweetObj.replies.push({
      handle: `@ayequill ✅`,
      profilePic: `images/tcruise.png`,
      tweetText: replyInput.value,
    });
  }
  console.log(targetTweetObj.replies);
  replyInput.value = " ";

  render();
}

function handleTweetBtnClick() {
  const tweetInput = document.getElementById("tweet-input");
  if (tweetInput.value) {
    tweetsData.unshift({
      handle: `@ayequill 💎`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: "uuidv4()",
    });
    render();
    tweetInput.value = "";
  }
}

function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach((tweet) => {
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

// render to dom
function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
