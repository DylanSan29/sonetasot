import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router desde @angular/router
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  curp: string = ''; // Mantenemos la propiedad curp
  mensajeError: string = ''; // Mensaje de error
  constructor(private router: Router,private http: HttpClient) {} // Inyecta el servicio Router en el constructor

  continuar() {
    console.log('CURP ingresada:', this.curp);
    if (this.validarCurp(this.curp)) {
      this.http.get<any>(`http://localhost:3000/citas/verify/${this.curp}`).subscribe(
        (response) => {
          this.router.navigate(['/registro', { curp: this.curp }]);
        },
        (error) => {
          console.error('Error al verificar la cita:', error);
          this.mensajeError = 'Error al verificar la cita.';
        }
      );
    } else {
      this.mensajeError = 'Estructura de CURP incorrecta';
    }
}


  validarCurp(curp: string): boolean {
    
    // Verifica que la CURP tenga la longitud correcta
    if (curp.length !== 18) {
      return false;
    }

    // Verifica que los primeros 4 caracteres sean letras
    const letras = /^[a-zA-Z]+$/;
    if (!letras.test(curp.substring(0, 3))) {
      return false;
    }
    
    // Verifica que el quinto caracter sea un dígito
    const quintoCaracter = curp.charAt(4);
    if (isNaN(Number(quintoCaracter))) {
      return false;
    }

    // Verifica que el sexto caracter sea un dígito o una letra
    const sextoCaracter = curp.charAt(5);
    if (!letras.test(sextoCaracter) && isNaN(Number(sextoCaracter))) {
      return false;
    }

    // Verifica que el séptimo caracter sea un dígito
    const septimoCaracter = curp.charAt(6);
    if (isNaN(Number(septimoCaracter))) {
      console.log("Incompleto");
      return false;
    }

    // Verifica que el octavo caracter sea un dígito
    const octavoCaracter = curp.charAt(7);
    if (isNaN(Number(octavoCaracter))) {
      console.log("Incompleto7");
      return false;
    }


    // Verifica que el siguiente caracter sea un dígito o una letra
    const caracterDespues = curp.charAt(15);
    if (!letras.test(caracterDespues) && isNaN(Number(caracterDespues))) {
      return false;
    }

    return true;
}

}
