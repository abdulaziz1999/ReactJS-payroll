// import { React } from "react";
// import { Col, Form, FormGroup , Input, Row, Button,Modal} from "reactstrap";

// class ModalTunjangan extends Component {
//   state = {
//     post: [],
//     formPegawai: {
//       id: "",
//       idpegawai: "",
//       nama: "",
//       nama_lembaga: "",
//       total: "",
//       idstatus: "",
//     },
//     formupdate:{
//       idpegawai: "",
//       total: ""
//     },
//     isUpdate: false,
//   };

  
//   render(){
//     return (
//       <div>
//           <Modal
//         className="modal-dialog-centered"
//         isOpen={this.state.exampleModal}
//         toggle={() => modal("exampleModal")}
//         size="lg"
//       >
//         <div className="modal-header">
//           <h5 className="modal-title" id="exampleModalLabel">
//             Tambah
//           </h5>
//           <button
//             aria-label="Close"
//             className="close"
//             data-dismiss="modal"
//             type="button"
//             onClick={() => modalClouse("exampleModal")}
//           >
//             <span aria-hidden={true}>×</span>
//           </button>
//         </div>
//         <div className="modal-body">
//           <Form>
//             <Row>
//               <Col md="6">
//                 <FormGroup>
//                   <label>Nama Pegawai :</label>
//                   <Input
//                     disabled
//                     name="nama"
//                     id="exampleFormControlInput1"
//                     placeholder="nama"
//                     value={nama}
//                     onChange={ubah()}
//                     type="text"
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md="6">
//                 <FormGroup>
//                 <label>Nama Lembaga :</label>
//                   <Input
//                     disabled
//                     placeholder="Regular"
//                     name="nama_lembaga"
//                     type="text"
//                     onChange={ubah()}
//                     value={nama_lembaga}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>
//             <Row>
//               <Col md="12">
//                 <FormGroup>
//                 <label>Jumlah Kredit :</label>
//                   <Input
//                     placeholder="Regular"
//                     name="kredit"
//                     type="text"
//                     onChange={ubah()}
//                     value={kredit}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>
//           </Form>
//         </div>
//         <div className="modal-footer">
//           <Button
//             color="danger"
//             data-dismiss="modal"
//             type="button"
//             size="sm"
//             onClick={() => modalClouse("exampleModal")}
//           >
//             Close
//           </Button>
//           <Button
//             color="info"
//             type="button"
//             size="sm"
//             onClick={() => save("exampleModal")}
//           >
//             <i className="ni ni-air-baloon"></i> Update
//           </Button>
//         </div>
//       </Modal>
//       </div>
//   )
//   } 
    
// }

// export default ModalTunjangan;