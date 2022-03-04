import React, { Component } from 'react';
import { BiQuestionMark } from 'react-icons/bi'; //BoxIcons
import { BsPlusSquare, BsFillQuestionSquareFill } from "react-icons/bs"; //BootStrap
import { FaQuestionCircle, FaRegQuestionCircle} from 'react-icons/fa'; //FontAwesome

class Icons extends Component {
  render() {
    return (
    <div>
      <BiQuestionMark />
      <BsFillQuestionSquareFill />
      <BsPlusSquare />
      <FaQuestionCircle />
      <FaRegQuestionCircle />
      <FaRegQuestionCircle />
    </div>
    )
  }
}

export default Icons
