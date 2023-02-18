import React, { useRef } from "react";
import { IUserProfile, IPhotoDoc } from "../../types/types";
import PreviewUser from "../foundUser/foundUsers";
import Like from "./like";
import { getRelativeTimeString } from '../../helpers/helpers';
import Comments from "./comments-list";
import { useOnClickOutside } from "../../helpers/useOnClickOutside";

type ModalPropsType = {
  user: IUserProfile | null; 
  photo: IPhotoDoc;
  closeModal: () => void;
}

function ModalPost(props: ModalPropsType) {
  const { caption, dateCreated, comments, docId, imageSrc, likes, userId } = props.photo;
  const date = getRelativeTimeString(dateCreated, 'en');
  const menuRef = useRef<HTMLDivElement>(null);
  if (!props.user) {
    return null
  }
  useOnClickOutside(menuRef, props.closeModal);

  return (
      <div style={{
        width: '100%',
        margin: '0 5%'
      }}>
    <div  className="modal">
        <div ref={menuRef} style={{
          display: 'flex',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{
            height: '100%',
            maxWidth: '50%',
            flexShrink: 0,
            margin: '2%'
          }}>
            <img
              src={imageSrc}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: '1% 3%'
            }}>
              <PreviewUser
                user={props.user}
              />
              <div style={{
                color: '#000000',
                fontSize: 50,
                lineHeight: 0,
                alignSelf: 'baseline'
              }}>...</div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                margin: '1% 4%',
                rowGap: '10px'
              }}
            >
              <Like likes={likes} docId={docId} />
              <div>{date}</div>
              <div>{caption}</div>
              <div>
                <Comments comments={comments} docId={docId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalPost;

function dispatch(arg0: void) {
  throw new Error("Function not implemented.");
}
