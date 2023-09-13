
#include <stdio.h>

int main() {
  int v_char;
  printf("helloworld\n");
  printf("%d\n", EOF);

  while ((v_char = getchar()) != '#') {
    if (v_char == EOF) {
      printf("EOF");
    }

    putchar(v_char);
  }

  return 0;
}