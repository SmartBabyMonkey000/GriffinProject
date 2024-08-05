import React from 'react';
import { images } from '../constants';
import { Navbar } from '../components';
import { Footer } from '../container';
import './disclaimer.css';

export default function Otherpage() {
  return (
    <div>
      <Navbar />
      <div className="disclaimerPage" id="disclaimer">
        <div className="disclaimerHolder">
          <div className="disclaim">
            <h1>Disclaimer</h1>
            <p>Last Updated: 03-04-2022</p>

            <p>By agreeing to these Terms and accessing the Service, you agree, to the fullest extent permitted by applicable law, to indemnify, defend, and hold harmless Griffin Kingdom, and our respective past, present, and future employees, service providers, successors, from and against all actual or alleged claims, damages, awards, judgments, losses, liabilities, obligations, penalties, interest, fees, expenses (including, without limitation, attorneys’ fees and expenses), and costs (including, without limitation,
              court costs, costs of settlement, and costs of pursuing indemnification and insurance), of every kind and nature whatsoever, whether known or unknown, foreseen or unforeseen,
              matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract, or otherwise (collectively, “Claims”), including, but not limited to, damages to property or personal injury, that are caused by, arise out of or are related to (a) your use or misuse of the Service, content, NFTs, or content linked to or associated with any NFTs (b) any Feedback you provide,
              (c) your violation or breach of any term of these Terms or applicable law, and (d) your violation of the rights of or obligations to a third party, including another user or third-party, and (e) your negligence or willful misconduct. You further agree that the Griffin Kingdom Parties shall have control of the defense or settlement of any Claims.
              THIS INDEMNITY IS IN ADDITION TO, AND NOT IN LIEU OF, ANY OTHER INDEMNITIES SET FORTH IN A WRITTEN AGREEMENT BETWEEN YOU AND Griffin Kingdom.
            </p>

            <p>The value of an NFTs is subjective. Prices of NFTs are subject to volatility and fluctuations in the price of cryptocurrency can also materially and adversely affect NFT prices. You acknowledge that you fully understand this subjectivity and volatility and that you may lose money.</p>

            <p>A lack of use or public interest in the creation and development of distributed ecosystems could negatively impact the development of those ecosystems and related applications and could therefore also negatively impact the potential utility of NFTs.</p>

            <p>The regulatory regime governing blockchain technologies, non-fungible tokens, cryptocurrency, and other crypto-based items is uncertain, and new regulations or policies may materially adversely affect the development of the Service and the utility of NFTs.</p>

            <p>You are solely responsible for determining what, if any, taxes apply to your transactions. Griffin Kingdom is not responsible for determining the taxes that apply to your NFTs.</p>

            <p>You represent and warrant that you have done sufficient research before making any decisions to sell, obtain, transfer, or otherwise interact with any NFTs or accounts/collections.</p>

            <p>We do not control the public blockchains that you are interacting with, and protocols that may be integral to your ability to complete transactions on these public blockchains. Additionally, blockchain transactions are irreversible and Griffin Kingdom has no ability to reverse any transactions on the blockchain.</p>

            <p>There are risks associated with using Internet and blockchain based products, including, but not limited to, the risk associated with hardware, software,
              and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to your third-party
              wallet or Account. You accept and acknowledge that Griffin Kingdom will not be responsible for any communication failures, disruptions, errors, distortions or
              delays you may experience when using the Service or any Blockchain network, however caused.
            </p>

            <p>The Service relies on third-party platforms and/or vendors. If we are unable to maintain a good relationship with such platform providers and/or vendors; if the terms and conditions or pricing of such platform providers and/or vendors change; if we violate or cannot comply with the terms and conditions of such platforms and/or vendors; or if any of such platforms and/or vendors loses market share or falls out of favor or is unavailable for a prolonged period of time, access to and use of the Service will suffer.</p>

            <p>If you have a dispute with one or more users, YOU RELEASE US FROM CLAIMS, DEMANDS, AND DAMAGES OF EVERY KIND AND NATURE, KNOWN AND UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH SUCH DISPUTES. IN ENTERING INTO THIS RELEASE, YOU EXPRESSLY WAIVE ANY PROTECTIONS (WHETHER STATUTORY OR OTHERWISE) THAT WOULD OTHERWISE LIMIT THE COVERAGE OF THIS RELEASE TO INCLUDE THOSE CLAIMS WHICH YOU MAY KNOW OR SUSPECT TO EXIST IN YOUR FAVOR AT THE TIME OF AGREEING TO THIS RELEASE.</p>

            <p>We reserve the right in our sole discretion to modify, temporarily or permanently, the Service (or any features or parts thereof) at any time and without liability as a result.</p>

            <p>Griffin Kingdom reserves the right to change or modify these Terms at any time and in our sole discretion. If we make material changes to these Terms, we will
              use reasonable efforts to provide notice of such changes, such as by providing notice through the Service or updating the “Last Updated” date at the beginning
              of these Terms. By continuing to access or use the Service, you confirm your acceptance of the revised Terms and all the terms incorporated therein by
              reference effective as of the date these Terms are updated. It is your sole responsibility to review the Terms from time to time to view such changes and
              to ensure that you understand the terms and conditions that apply when you access or use the Service.
            </p>

            <p>You also represent and warrant that you will comply with all applicable laws (e.g., local, state, federal and other laws) when using the Service.
              Without limiting the foregoing, by using the Service, you represent and warrant that: (a) you are not located in a country that is subject to a U.S.
              Government embargo; and (b) you have not been identified as a Specially Designated National or placed on any U.S. Government list of prohibited,
              sanctioned, or restricted parties. If you access or use the Service outside the United States, you are solely responsible for ensuring that your access and
              use of the Service in such country, territory or jurisdiction does not violate any applicable laws.
            </p>

            <p>Your access and use of the Service may be interrupted from time to time for any of several reasons, including, without limitation, the malfunction of equipment, periodic updating, maintenance, or repair of the Service or other actions that Griffin Kingdom, in its sole discretion, may elect to take.</p>

            <p>We require all users to be at least 18 years old. If you are at least 13 years old but under 18 years old, you may only use Griffin Kingdom through a parent or guardian’s Account and with their approval and oversight. That account holder is responsible for your actions using the Account. It is prohibited to use our Service if you are under 13 years old.</p>

            <p>We welcome feedback, comments, and suggestions for improvements to the Service by directly messaging us on Twitter or on Discord. You acknowledge and
              expressly agree that any contribution of Feedback does not and will not give or grant you any right, title, or interest in the Service or in any such
              Feedback. You agree that Griffin Kingdom may use and disclose Feedback in any manner and for any purpose whatsoever without further notice or
              compensation to you and without retention by you of any proprietary or other right or claim. You hereby assign to Griffin Kingdom any and all right,
              title, and interest (including, but not limited to, any patent, copyright, trade secret, trademark, show-how, know-how, moral rights and any and all
              other intellectual property right) that you may have in and to any and all Feedback.
            </p>

          </div>

          <div className="griffinCreature">
            <img src={images.griffinGolden} alt="Golden Griffin" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
