/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import React from 'react';

import './Faq.css';

const Faq = () => (
  <div className="faq" id="faq">
    <h2 className="sectionTitle">FAQ</h2>
    {/* GENERAL */}
    <h3 className="faqSubhead">General</h3>
    <div className="faqHolder">
      {/* <details open> */}
      <details>
        <summary>What is Griffin Kingdom?</summary>
        <div className="faq__content">
          <p>The Griffin Kingdom is an exciting new opportunity for investors to diversify their crypto investment profile. Holding one of our NFTs allows you to participate in our weekly AirDrops, where you will receive a Phoenix Nest. Our vision is to create a Kingdom that will enable every holder to win life-changing giveaways!</p>
        </div>
      </details>
      <details>
        <summary>What is the $FIRE token?</summary>
        <div className="faq__content">
          <p>$FIRE is a token that is designed to generate high-yield rewards by combining investment capital into DeFi yield protocols, decentralized reserve currency, and other high-yield, large scale investments that are generally unsuitable for individual investors.</p>
        </div>
      </details>
      <details>
        <summary>What is a Phoenix Nest?</summary>
        <div className="faq__content">
        <p>A Nest is a term used to describe an initial deposit holding. When you create a Nest, you are depositing funds to the treasury to be used for the project&apos;s investments.</p>
        </div>
      </details>
      <details>
        <summary>Why is $FIRE on the Avalanche Chain?</summary>
        <div className="faq__content">
          <p>Our goal is to bring DeFi into the average household. Ethereum&apos;s high gas fees make it impossible for most people to access the Ethereum network. We want $FIRE to be accessible to everyone, including smallholders, so we chose to be on the Avalanche Chain. However, this does not prevent us from taking advantage of DeFi yield protocols on Ethereum.</p>
        </div>
      </details>
      <details>
        <summary>What are the benefits of owning a Griffin Kingdom NFT?</summary>
        <div className="faq__content">
          <p>The benefit of owning a Griffin Kingdom NFT is that you will have eligibility to participate in our weekly Nest AirDrop and have whitelist placement for any future Griffin Kingdom Products and Services.</p>
        </div>
      </details>
      <details>
        <summary>Is Griffin Kingdom affiliated with Phoenix Community Capital (PCC)?</summary>
        <div className="faq__content">
          <p>Yes! PCC and Griffin Kingdom are partnered together on this project to provide an outstanding NFT and giveaway system. PCC is the manager of the Griffin Kingdom treasury.</p>
        </div>
      </details>
    </div>

{/* MINTING */}
<h3 className="faqSubhead">Minting</h3>
    <div className="faqHolder">
      <details>
        <summary>What is the breakdown of the mint profits?</summary>
        <div className="faq__content">
          <p>Revenue from the sale of NFTs will be paid back to PCC for the allocation of the 1300 Nests. The leftover amount will be used to pay for the Certik Audit and operating expenses.<br />
          </p>
        </div>
      </details>
      <details>
        <summary>How do I mint an NFT?</summary>
        <div className="faq__content">
          <p>You can mint an NFT by connecting to the Griffin Kingdom site using your wallet, such as Metamask. Ensure you are on the Avalanche Network and from there, click Mint and the number of NFTs you would like to mint.</p>
        </div>
      </details>
      <details>
        <summary>Which NFT will I get?</summary>
        <div className="faq__content">
          <p>You will receive an NFT at random.</p>
        </div>
      </details>
      <details>
        <summary>Why does Minting cost increase per tier?</summary>
        <div className="faq__content">
          <p>The pricing structure was designed to give early adopters an initial discount. The prices are set to ensure we can Air Drop more rewards as each tier progresses. This is for the benefit of the members of Griffin Kingdom.</p>
        </div>
      </details>
      <details>
        <summary>What changes with each tier?</summary>
        <div className="faq__content">
          <p>When a tier changes, the price of the NFTs increases, the giveaway cap, and the number of winners per week increases per tier. <br />
          - Tier 1 @ 20% Sold: 5 Nests/Week up to 260 Nests<br />
          - Tier 2 @ 40% Sold: 10 Nests/Week up to 520 Nests<br />
          - Tier 3 @ 60% Sold: 15 Nests/Week up to 780 Nests<br />
          - Tier 4 @ 80% Sold: 20 Nests/Week up to 1040 Nests<br />
          - Tier 5 @ 100% Sold: 25 Nests/Week up to 1300 Nests
          </p>
        </div>
      </details>
    </div>

{/* AIR DROPS */}
<h3 className="faqSubhead">Air Drops</h3>
    <div className="faqHolder">
      <details>
        <summary>How will the Air Drops work?</summary>
        <div className="faq__content">
          <p>PCC will AirDrop Nests directly into wallets. e.g., like that have done with the 5000 Nests they AirDropped on April 1<sup>st.</sup></p>
        </div>
      </details>
      <details>
        <summary>What are the weekly Air Drops?</summary>
        <div className="faq__content">
          <p>Each week we will Air Drop each winner a Phoenix Nest.</p>
        </div>
      </details>
      <details>
        <summary>My NFT won; how do I claim the reward?</summary>
        <div className="faq__content">
          <p>The Air Drops will be manually distributed to the wallets of the winners, and you will not need to do anything to obtain your Nest. You may view our Winners on the website, Twitter, or Discord if you wish.</p>
        </div>
      </details>
      <details>
        <summary>I won, but I did not receive my AirDrop. What do I do?</summary>
        <div className="faq__content">
          <p>If you won and did not receive an AirDrop, please reach out to <a href="mailto:support@griffinkingdom.finance">support@griffinkingdom.finance</a>. Please send us the wallet address that contains the NFT that won. </p>
        </div>
      </details>
      <details>
        <summary>If I win an Air Drop, will I still be entered into future Air Drops?</summary>
        <div className="faq__content">
          <p>Yes! Holding a Griffin Kingdom NFT allows you to participate in our Air Drops if you pay your maintenance fees to keep Air Drops status Active.</p>
        </div>
      </details>
      <details>
        <summary>Where will winners be listed?</summary>
        <div className="faq__content">
          <p>The winners will be listed on our Twitter, Discord, and website.</p>
        </div>
      </details>
      <details>
        <summary>What are the NFT maintenance fees?</summary>
        <div className="faq__content">
            <p>You must pay the NFT maintenance fees to maintain active status in the Air Drops. If the maintenance fee goes to zero days, you will no longer be able to participate in the Air Drops until you pay the fee. You do not need to pay the maintenance fee to maintain ownership of your NFT.</p>
        </div>
        </details>
        <details>
        <summary>What is the purpose of the NFT maintenance fees?</summary>
        <div className="faq__content">
            <p>Griffin Kingdom NFT maintenance fees are used for Phoenix Nest maintenance and claiming fees. These fees are required for sustainability and to continue Air Drops past 100% of NFTs sold.</p>
        </div>
        </details>
        <details>
        <summary>How do I pay my maintenance fee?</summary>
        <div className="faq__content">
            <p>You can manage your NFT maintenance fees on the View My NFT page. You can pay the fee in 30, 60, and 90 days increments.</p>
        </div>
        </details>
        <details>
        <summary>Does one faction have more of a chance to win over another?</summary>
        <div className="faq__content">
            <p>No, every Griffin Kingdom NFT has an equal opportunity to win an AirDrop regardless of their faction. Factions are created equally and do not affect win rates. Factions are only for entertainment purposes to keep NFT holders engaged.</p>
        </div>
        </details>
    </div>

{/* NEST CAP */}
    <h3 className="faqSubhead">Nest Cap</h3>
    <div className="faqHolder">
      <details>
        <summary>What is the Public Nest Cap?</summary>
        <div className="faq__content">
          <p>The Public Nest cap is the maximum number of Nests apart from the amount allocated to The Griffin Kingdom and other PCC incubators.</p>
        </div>
      </details>
      <details>
        <summary>What happens when Public Nest Cap?</summary>
        <div className="faq__content">
          <p>Upon reaching the Public Nest Cap, the remainder of Nest reserved for the Griffin Kingdom will be decided up to a set amount weekly to create sustainable Nest Airdrops for at least a year!</p>
        </div>
      </details>
      <details>
        <summary>How does Nest Cap affect this project?</summary>
        <div className="faq__content">
          <p>It does not affect the longevity of this project. This project was designed for sustainability for at least one year of AirDropping Nests after the Public Cap.</p>
        </div>
      </details>
    </div>

{/* SUSTAINABILITY */}
<h3 className="faqSubhead">Sustainability</h3>
    <div className="faqHolder">
      <details>
        <summary>How much is reserved for Griffin Kingdom?</summary>
        <div className="faq__content">
          <p>Phoenix Community has reserved 1,300 $FIRE Nests for The Griffin Kingdom!</p>
        </div>
      </details>
      <details>
        <summary>Why are you limiting the rewards per tier?</summary>
        <div className="faq__content">
          <p>We are limiting rewards to create sustainability; this should allow the project to last for at least one and a half years AirDropping Nests.</p>
        </div>
      </details>
      <details>
        <summary>What happens if people are no longer minting NFTs?</summary>
        <div className="faq__content">
          <p>If people are no longer minting NFTs we will continue to giveaways Nests up to the tier cap. This cap is set at 260 total Nests per tier. After this cap is reached, we will raise the cap per the number of NFTs sold in between the current tiers.</p>
        </div>
      </details>
      <details>
        <summary>What are the benefits of being a Griffin Kingdom NFT member after the last Nest is Air Dropped?</summary>
        <div className="faq__content">
          <p>We are working with PCC to come up with future projects and solutions to benefit all the Griffin Kingdom NFTs members.</p>
        </div>
      </details>
    </div>
  </div>
);

export default Faq;
