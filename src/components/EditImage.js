import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fabric } from 'fabric';
import { saveAs } from 'file-saver';
import './EditImage.css';
import AddText from './AddText';
import AddShape from './AddShape';

let canvas;

export default class EditImage extends Component {
  static defaultProps = {
    width: `${(window.outerWidth * 60) / 100}`,
    height: `${(window.innerHeight * 70) / 100}`
  };
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      adding: 'text'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addTextToCanvas = this.addTextToCanvas.bind(this);
    this.changeAddModeToShape = this.changeAddModeToShape.bind(this);
    this.changeAddModeToText = this.changeAddModeToText.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
  }

  componentDidMount() {
    canvas = new fabric.Canvas(this.c);
    canvas.on('mouse:dblclick', () => {
      canvas.discardActiveObject();
      canvas.renderAll();
    });
    if (this.props.imageInfo) {
      let image = new fabric.Image.fromURL(
        this.props.imageInfo.hdImgUrl,
        function(img) {
          img.scale(0.3);
          canvas.clear();
          canvas.add(img);
          canvas.sendToBack(img);
        },
        { crossOrigin: 'Anonymous' }
      );
    }
  }

  changeAddModeToShape() {
    this.setState({ adding: 'shape' });
  }

  changeAddModeToText() {
    this.setState({ adding: 'text' });
  }

  handleChange(e) {
    this.setState({ caption: e.target.value });
  }

  handleClick(e) {
    e.persist();
    this.addShapeToCanvas(e.target.name);
  }

  // downloadImage() {
  //   const imgData = canvas
  //     .toDataURL('jpeg', 1)
  //     .replace('image/png', 'image/octet-stream');
  //   window.location.href = imgData;
  //   alert(
  //     `Downloaded image doesn't have a file extension. So please rename file and add ".jpeg" as a file extension. Then there should be no problem in viewing the image after adding extension.`
  //   );
  // }

  downloadImage() {
    this.c.toBlob(
      function(blob) {
        saveAs(blob, 'your_brand_new_amazing_image.jpeg');
      },
      'image/jpeg',
      1
    );
  }

  deleteObject() {
    if (canvas.getActiveObject()) {
      canvas.remove(canvas.getActiveObject());
    } else {
      alert('Please select an object first.');
    }
  }

  addTextToCanvas({ caption, fontFamily, fontColor }) {
    const text = new fabric.IText(caption, {
      fontFamily,
      left: Math.floor(Math.random() * 200 + 1),
      top: Math.floor(Math.random() * 200 + 1),
      fill: fontColor
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  }

  addShapeToCanvas(typeOfShape) {
    let shape;
    switch (typeOfShape) {
      case 'rectangle':
        shape = new fabric.Rect({
          left: 100,
          top: 100,
          fill: 'red',
          width: 20,
          height: 20
        });
        break;

      case 'circle':
        shape = new fabric.Circle({
          radius: 20,
          fill: 'green',
          left: 100,
          top: 100
        });
        break;

      case 'triangle':
        shape = new fabric.Triangle({
          width: 20,
          height: 30,
          fill: 'blue',
          left: 50,
          top: 50
        });
        break;

      case 'polygon':
        shape = new fabric.Polygon(
          [
            { x: 200, y: 0 },
            { x: 250, y: 50 },
            { x: 250, y: 100 },
            { x: 150, y: 100 },
            { x: 150, y: 50 }
          ],
          {
            left: 250,
            top: 150,
            angle: 0,
            fill: 'violet'
          }
        );
        break;

      default:
        break;
    }
    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
    } else {
      console.log('please provide one of the following shape as argument');
    }
  }

  render() {
    const { imageInfo, width, height } = this.props;
    return (
      <div style={{ padding: '1rem' }}>
        {imageInfo ? (
          <>
            <h2 style={{ marginBottom: '1rem' }}>
              Image size is of high quality. Please wait for it to load.
            </h2>
            <div
              className='container'
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div
                className='item1'
                style={{ height: '100%', marginBottom: '1rem' }}
              >
                <canvas ref={c => (this.c = c)} width={width} height={height} />
              </div>

              <div
                className='item2'
                style={{
                  height: '100%',
                  marginTop: '2rem',
                  marginRight: 'auto',
                  marginLeft: '5rem',
                  alignSelf: 'flex-start'
                }}
              >
                <h2 style={{ marginBottom: '3rem' }}>
                  <Link to='/'> &larr; Go Back</Link>
                </h2>

                <div
                  className='change-adding-mode'
                  style={{ marginBottom: '3rem' }}
                >
                  <button
                    disabled={this.state.adding === 'text'}
                    onClick={this.changeAddModeToText}
                    style={{ marginRight: '2rem' }}
                  >
                    Add Text
                  </button>

                  <button
                    disabled={this.state.adding === 'shape'}
                    onClick={this.changeAddModeToShape}
                  >
                    Add Shape
                  </button>
                </div>

                <div className='adding-mode' style={{ marginBottom: '3rem' }}>
                  {this.state.adding === 'text' ? (
                    <AddText addTextToCanvas={this.addTextToCanvas} />
                  ) : (
                    this.state.adding === 'shape' && (
                      <AddShape handleClick={this.handleClick} />
                    )
                  )}
                </div>

                <button
                  onClick={this.deleteObject}
                  style={{ marginRight: '2rem' }}
                >
                  Delete Object
                </button>
                <button onClick={this.downloadImage}>Download Image</button>
              </div>
            </div>

            <h2 style={{ marginBottom: '1rem' }}>
              <strong>Note 1</strong>: Image rendered inside canvas is of high
              quality {`(${imageInfo.hdImgUrl.split('_')[1].split('.')[0]})`}{' '}
              but it has been scaled down to fit in the canvas. Thus, you can
              resize or scale up the image without worrying too much about image
              quality.
            </h2>

            <h2 style={{ marginBottom: '3rem' }}>
              <strong>Note 2</strong>: Double click inside canvas to bring text
              or shape hidden behind image forward.
            </h2>
          </>
        ) : (
          <h2>
            No Image found to modify or add caption, please got to{' '}
            <Link to='/'>homePage</Link> and search for an image.
          </h2>
        )}
      </div>
    );
  }
}
