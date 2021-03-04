import React, { 
    forwardRef,
    useImperativeHandle,
    useRef,
    useState } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import './matchingModal.scss'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { motion, AnimatePresence } from "framer-motion";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const MatchingModal = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false)
    };
  });

    const formerRendering = () => {
        return (
            <div className="matchingmodals__container">
                <Modal
                    open={props.open}
                    onClose={props.handleClose}
                >
                    <motion.div
                        animate={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="matchingmodals__item">
                            <span className="matchingmodals__item__emoji">&#128588;</span><h3>상대방에게 인삿말을 보내주세요!</h3>
                            <p>상대방도 매칭을 수락할 수 있게 간단한 인삿말을 보내주세요.</p>
                            <form className="matchingmodals__item__form">
                                <div className="matchingmodals__item__input">
                                    <TextField id="outlined-basic" label="인삿말" variant="outlined" />
                                </div>
                                <div className="matchingmodals__item__buttons">
                                    <div className="matchingmodals__item__button"><Button variant="contained" color="primary">보내기</Button></div>
                                    <div className="matchingmodals__item__button"><Button variant="contained" color="secondary">취소</Button></div>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </Modal>
            </div>
        )
    }

    return (
        <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3
              }
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.3
              }
            }}
            onClick={() => setOpen(false)}
            className="modal-backdrop"
          />
          <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3
              }
            }}
            exit={{
              scale: 0,
              transition: {
                delay: 0.3
              }
            }}
            className="modal-content-wrapper"
          >
            <motion.div
              className="modal-content"
              initial={{
                x: 100,
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3
                }
              }}
              exit={{
                x: 100,
                opacity: 0,
                transition: {
                  duration: 0.3
                }
              }}
            >
              {props.children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    )
});

export default MatchingModal