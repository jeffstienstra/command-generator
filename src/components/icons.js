import React, { Component } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { BsHeartFill, BsHeart } from "react-icons/bs";
import {FaQuestion} from 'react-icons/fa';

class Icons extends Component {
  render() {
    return (
    <div>
      <FaHeart />
      <FaRegHeart />
      <BsHeartFill />
      <BsHeart />
      <FaQuestion />
    </div>
    )
  }
}

export default Icons
