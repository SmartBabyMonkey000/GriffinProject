import React from 'react';
import { images } from '../constants';
import { Navbar } from '../components';
import { Footer } from '../container';
import './griffin.css';

export default function Otherpage() {
  return (
    <div>
      <Navbar />
      <div className="griffinPage" id="griffin">
        <div className="griffinHolder">

          <div className="griffinCreature">
            <img src={images.griffinSample} alt="Golden Griffin" />
          </div>

          <div className="griffinAttributes">
            <h1>Griffin #707</h1>
            <div className="attribute">
              <p><b>Background:</b> Gray</p>
              <span>+ 57</span>
            </div>

            <div className="attribute">
              <p><b>Head:</b> Mask</p>
              <span>+ 11</span>
            </div>

            <div className="attribute">
              <p><b>Body:</b> Shield</p>
              <span>+ 143</span>
            </div>

            <div className="attribute">
              <p><b>Background:</b> Gray</p>
              <span>+ 57</span>
            </div>

            <div className="attribute">
              <p><b>Head:</b> Mask</p>
              <span>+ 11</span>
            </div>

            <div className="attribute">
              <p><b>Body:</b> Shield</p>
              <span>+ 143</span>
            </div>

            <div className="attribute">
              <p><b>Background:</b> Gray</p>
              <span>+ 57</span>
            </div>

            <div className="attribute">
              <p><b>Head:</b> Mask</p>
              <span>+ 11</span>
            </div>

            <div className="attribute">
              <p><b>Body:</b> Shield</p>
              <span>+ 143</span>
            </div>
            <div className="attribute">
              <p><b>Background:</b> Gray</p>
              <span>+ 57</span>
            </div>

            <div className="attribute">
              <p><b>Head:</b> Mask</p>
              <span>+ 11</span>
            </div>

            <div className="attribute">
              <p><b>Body:</b> Shield</p>
              <span>+ 143</span>
            </div>
          </div>

          <div className="rightAttrib">
            <div className="badge">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="216px" height="232px" viewBox="0 0 216 232">
                <path fill="#c73333" d="M207,0C171.827,0.001,43.875,0.004,9.003,0c-5.619-0.001-9,3.514-9,9c0,28.23-0.006,151.375,0,169    c0.005,13.875,94.499,54,107.999,54S216,191.57,216,178V9C216,3.298,212.732,0,207,0z" />
              </svg>
              <p className="title">SCORE<br />177</p>
              <p className="subtitle">RANK 365</p>
              <p className="classBadge">
                <span className="griffinClass">Legendary</span>
              </p>
            </div>
            {/* <div className="griffinClass">Guardians</div>
            <div className="griffinClass">Legendary</div>
            <div className="griffinClass">Rare</div>
            <div className="griffinClass">Common</div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
