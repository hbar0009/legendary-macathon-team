import React from "react";
import { Col, Modal, ModalProps, Row } from "react-bootstrap";
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers";
import orgImgPlaceholder from "./organisation_placeholder.jpg";
import Image from "next/image";

const HostInfoModal = (
  props: JSX.IntrinsicAttributes &
    Omit<
      Pick<
        React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        "key" | keyof React.HTMLAttributes<HTMLDivElement>
      > & {
        ref?:
          | ((instance: HTMLDivElement | null) => void)
          | React.RefObject<HTMLDivElement>
          | null
          | undefined;
      },
      BsPrefixProps<"div"> & ModalProps
    > &
    BsPrefixProps<"div"> &
    ModalProps & { children?: React.ReactNode }
) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <br />
        <Image
          src={orgImgPlaceholder}
          alt="Place holder of event host picture"
          width={100}
          height={100}
        />
        <h2>{props.hostInfo.name}</h2>
        <br />
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          {`Address: ${props.hostInfo.address}`}
          <br />
          {`Phone Numbner: ${props.hostInfo.phone}`}
          <br />
          {`Website: ${props.hostInfo.website}`}
          <br />
          {`Description: ${props.hostInfo.description}`}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default HostInfoModal;
