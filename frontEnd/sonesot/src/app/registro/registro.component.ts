import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  curp: string = '';
  citas: any[] = [];
  nombre: string = '';
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.curp = params.get('curp') || ''; // Obtener el valor de curp de los parámetros de la ruta

      // Hacer la solicitud HTTP para obtener las citas asociadas al CURP
      if (this.curp) {
        this.http.get<any>(`http://localhost:3000/citas/getAll/${this.curp}`).subscribe(
          (response) => {
            this.citas = response.citas || []; // Guardar las citas devueltas en la variable citas
            console.log('Citas obtenidas:', this.citas);
            this.nombre = this.citas[0].nombre;
          },
          (error) => {
            console.error('Error al obtener las citas:', error);
          }
        );
      }
    });
  }
}
