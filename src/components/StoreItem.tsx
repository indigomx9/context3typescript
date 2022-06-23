import React from "react";
import { Card } from "react-bootstrap";

type Props = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
};

export const StoreItem = 
({ id, name, price, imgUrl }: Props) => {
    return (
        <React.Fragment>
            <Card>
                <Card.Img 
                    variant="top" 
                    src={imgUrl} 
                    height="200px"
                    style={{ objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                    <Card.Title 
                        className="d-flex 
                            justify-content-between 
                            align-items-baseline">
                                <span className="fs-2">{name}</span>
                                <span className="ms-2 text-muted">{price}</span>
                    </Card.Title>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

