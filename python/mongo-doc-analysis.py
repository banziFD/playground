
import numpy as np
import json
import matplotlib.pyplot as plt


def read_json(filename):
  with open(filename, 'r') as file:
    summary = json.load(file)
    return summary


def analyze(summary):
  for col_summary in summary:
    col_name = col_summary['colName']
    # if(col_name != 'creationlog'):
      # continue
    print('analyzing {colName}'.format(colName=col_name))

    size_array = np.array([i['bsonSize'] for i in col_summary['bsonSizes']])


    size_array = size_array / 1000
    print('sample size: {len}'.format(len=col_summary['length']))
    print('mean: {mean} kb'.format(mean=size_array.mean()))
    print('max: {max} kb'.format(max=size_array.max()))
    print('min: {min} kb'.format(min=size_array.min()))
    print('median: {median} kb'.format(median=np.median(size_array)))
    print('\n\n\n\n')

    plt.clf()

    plt.figure(figsize=(16,10))
    # plt.hist(size_array, bins=np.logspace(np.log10(0.1), np.log10(2), 50), facecolor='blue',
            #  edgecolor='black', alpha=0.7)
    plt.hist(size_array, bins=50, facecolor='blue',
             edgecolor='black', alpha=0.7, log=True)
    plt.title(col_name)
    plt.xlabel('kb')
    plt.savefig('./png/{colName}.png'.format(colName=col_name))

  return


def main():
  filename = './summary.json'
  summary = read_json(filename)
  analyze(summary)


if __name__ == '__main__':
  main()
